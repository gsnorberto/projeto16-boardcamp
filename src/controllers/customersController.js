import { db } from "../config/database.js"
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat)

export const getCustomers = async (req, res) => {
    let { cpf, offset, limit, order, desc } = req.query
    let query;

    let stringOffset = ''
    let stringLimit = ''
    let stringOrder = ''
    if(order){
        if(desc) stringOrder = `ORDER BY "${order}" DESC`
        else stringOrder = `ORDER BY "${order}"`
    }
    if(offset) stringOffset = `OFFSET ${offset}`
    if(limit) stringLimit = `LIMIT ${limit}`

    try {
        if(cpf){
            query = `
                SELECT * FROM customers
                WHERE cpf LIKE '${cpf}%' 
                ${stringLimit}
                ${stringOffset}
                ${stringOrder};
            `
        } else  {
            query = `
                SELECT * FROM customers
                ${stringLimit}
                ${stringOffset}
                ${stringOrder};
            `
        }
        const customers = await db.query(query)

        const newData = customers.rows.map(item => ({...item, birthday: dayjs(item.birthday).format('YYYY-MM-DD') }))

        res.send(newData);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getCustomerById = async (req, res) => {
    let { id } = req.params

    try {
        const customer = await db.query('SELECT * FROM customers WHERE id = $1;', [id])
        if (customer.rows.length === 0) {
            return res.sendStatus(404)
        }

        const newData = customer.rows.map(item => ({...item, birthday: dayjs(item.birthday).format('YYYY-MM-DD') }))

        res.send(newData[0]);
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
        const customer = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf])
        if (customer.rows.length > 0) {
            return res.sendStatus(409)
        }

        const query = `
            INSERT INTO
                customers (name, phone, cpf, birthday)
            VALUES 
                ($1, $2, $3, $4);
        `
        await db.query(query, [name, phone, cpf, birthday])
        res.sendStatus(201);
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
        const dataT1 = await db.query('SELECT * FROM customers WHERE id = $1;', [id])
        if (dataT1.rows.length === 0) {
            return res.sendStatus(404)
        }

        // check if the cpf already exists in the DB
        const dataT2 = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf])
        if (dataT1.rows[0].cpf !== cpf && dataT2.rows.length > 0) {
            return res.sendStatus(409)
        }

        const query = `
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5;
        `
        await db.query(query, [name, phone, cpf, birthday, id])
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}