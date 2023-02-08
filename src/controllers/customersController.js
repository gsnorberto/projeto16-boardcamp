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
    try {

    }
    catch (err) {

    }
}
export const addCustomer = async (req, res) => {
    try {
        const { name, phone, cpf, birthday } = req.body

        //  check if the birthday value is a valid date
        if (!dayjs(birthday, 'YYYY-MM-DD', true).isValid()) {
            console.log("foi")
            return res.sendStatus(400)
        }

        // check if the cpf already exists in the DB
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
        if(customer.rows.length > 0){
            return res.sendStatus(409)
        }

        const query = `
            INSERT INTO
                customers (name, phone, cpf, birthday)
            VALUES 
                ('${name}', '${phone}', '${cpf}', '${birthday}');
        `
        await db.query(query).rows
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const updateCustomer = async (req, res) => {
    try {

    }
    catch (err) {

    }
}

