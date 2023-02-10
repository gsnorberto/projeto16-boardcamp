import { db } from "../config/database.js"

export const getGames = async (req, res) => {
    let { name, offset, limit, order, desc } = req.query
    let query;

    let stringOffset = ''
    let stringLimit = ''
    let stringOrder = ''
    if(order){
        if(desc) stringOrder = `ORDER BY ${order} DESC`
        else stringOrder = `ORDER BY ${order}`
    }
    if (offset) stringOffset = `OFFSET ${offset}`
    if (limit) stringLimit = `LIMIT ${limit}`

    try {
        if (name) {
            query = `
                SELECT * FROM games
                WHERE name LIKE '${name}%'
                ${stringLimit}
                ${stringOffset}
                ${stringOrder};
            `
        } else {
            query = `
                SELECT * FROM games
                ${stringLimit}
                ${stringOffset}
                ${stringOrder};
            `
        }

        const games = await db.query(query)
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const addGame = async (req, res) => {
    let { name, image, stockTotal, pricePerDay } = req.body

    if (stockTotal <= 0 || pricePerDay <= 0) {
        return res.sendStatus(400)
    }

    try {
        let data = await db.query('SELECT * FROM games WHERE name = $1', [name])
        if (data.rows.length > 0) {
            return res.sendStatus(409)
        }

        let query = `
            INSERT INTO 
                games ("name", "image", "stockTotal", "pricePerDay")
            VALUES 
                ($1, $2, $3, $4);
        `

        await db.query(query, [name, image, stockTotal, pricePerDay])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}