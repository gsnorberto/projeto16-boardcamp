import { db } from "../config/database.js"
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat)

export const getCustomers = async (req, res) => {
    try {
        const customers = await db.query("SELECT * FROM customers")
        res.send(customers.rows);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getCustomerById = async (req, res) => {
    let { id } = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)
        if (customer.rows.length === 0) {
            return res.sendStatus(404)
        }

        res.send(customer.rows);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const addCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body

    //  check if the birthday value is a valid date
    if (!dayjs(birthday, 'YYYY-MM-DD', true).isValid()) {
        console.log("foi")
        return res.sendStatus(400)
    }

    try {
        // check if the cpf already exists in the DB
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
        if (customer.rows.length > 0) {
            return res.sendStatus(409)
        }

        const query = `
            INSERT INTO
                customers (name, phone, cpf, birthday)
            VALUES 
                ('${name}', '${phone}', '${cpf}', '${birthday}');
        `
        await db.query(query)
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const updateCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body
    let { id } = req.params

    //  check if the birthday value is a valid date
    if (!dayjs(birthday, 'YYYY-MM-DD', true).isValid()) {
        console.log("foi")
        return res.sendStatus(400)
    }

    try {
        // check if the user exists in the database	
        const dataT1 = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (dataT1.rows.length === 0) {
            return res.sendStatus(404)
        }

        // check if the cpf already exists in the DB
        const dataT2 = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
        if (dataT1.rows[0].cpf !== cpf && dataT2.rows.length > 0) {
            return res.sendStatus(409)
        }

        const query = `
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5
        `
        await db.query(query, [name, phone, cpf, birthday, id])
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

