import { db } from "../config/database.js"
import dayjs from 'dayjs'

export const getRentals = async (req, res) => {
    try {
        const rentals = await db.query('SELECT * FROM rentals;')

        const newData = rentals.rows.map(item => {
            if (item.returnDate) {
                return ({ ...item, rentDate: dayjs(item.rentDate).format('YYYY-MM-DD'), returnDate: dayjs(item.returnDate).format('YYYY-MM-DD') })
            } else {
                return ({ ...item, rentDate: dayjs(item.rentDate).format('YYYY-MM-DD') })
            }
        })

        for (const data of newData) {
            let game = await db.query('SELECT games.id, games.name FROM games WHERE id = $1', [data.gameId])
            let customer = await db.query('SELECT customers.id, customers.name FROM customers WHERE id = $1', [data.customerId])
            
            data.game = game.rows[0]
            data.customer = customer.rows[0]
        }

        res.send(newData);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const addRental = async (req, res) => {
    let { customerId, gameId, daysRented } = req.body

    if (daysRented <= 0) {
        return res.sendStatus(400)
    }

    try {
        const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
        if (game.rows.length === 0) { // game not found
            return res.sendStatus(400)
        }

        const customer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId])
        if (customer.rows.length === 0) { // customer not found
            return res.sendStatus(400)
        }

        const rentals = await db.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])
        if (rentals.rows.length === game.rows[0].stockTotal) { // game unavailable for rent
            return res.sendStatus(400)
        }

        let rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
        let originalPrice = Number(daysRented) * Number(game.rows[0].pricePerDay)
        let returnDate = null;
        let delayFee = null;

        let query = `
            INSERT INTO 
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7)
        `

        await db.query(query, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const finalizeRental = async (req, res) => {
    let { id } = req.params
    let delayFee = 0;

    try {
        let rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id])
        if (rental.rows.length <= 0) {
            return res.sendStatus(404)
        }

        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400)
        }

        let todayDate = new Date()
        let rentalDate = new Date(rental.rows[0].rentDate)
        let daysRented = rental.rows[0].daysRented - 1
        let dayMilliseconds = 86400000;

        let dateDifference = todayDate.getTime() - (rentalDate.getTime() + (daysRented * dayMilliseconds))// 
        let dateDelay = Math.ceil(dateDifference / (1000 * 3600 * 24)) // if the result is a negative number there is not delay

        if (dateDelay > 0) {
            let originalPrice = rental.rows[0].originalPrice
            delayFee = dateDelay * (originalPrice / daysRented)
        }

        let formatedDate = dayjs(Date.now()).format('YYYY-MM-DD')

        let query = `
            UPDATE rentals
            SET "returnDate" = $1, "delayFee" = $2
            WHERE id = $3
        `
        await db.query(query, [formatedDate, delayFee, rental.rows[0].id])

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const deleteRental = async (req, res) => {
    let { id } = req.params

    try {
        let rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id])
        if (rental.rows.length === 0) { // rental not found
            return res.sendStatus(404)
        }

        if (rental.rows[0].returnDate === null) { // unfinished rental
            return res.sendStatus(400)
        }

        await db.query('DELETE FROM rentals WHERE id = $1', [id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}