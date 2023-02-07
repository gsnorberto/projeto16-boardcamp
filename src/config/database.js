import Client from 'pg'

import dotenv from 'dotenv'
dotenv.config()

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

connection.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    connection.end()
})

const client = new Client({
    connectionString,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})