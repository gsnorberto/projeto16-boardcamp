import { db } from "../config/database.js"
import dayjs from 'dayjs'

export const getRentals = async (req, res) => {
    try{
        const rentals = await db.query('SELECT * FROM rentals;')
        res.send(rentals.rows);
    } catch(err){
        res.status(500).send(err.message)
    }
}

export const addRental = async (req, res) => {
    let { customerId, gameId, daysRented } = req.body

    if (daysRented <= 0 ){
        return res.sendStatus(400)
    }

    try{
        const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
        if(game.rows.length === 0){ // game not found
            return res.sendStatus(400)
        }

        const customer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId])
        if(customer.rows.length === 0){ // customer not found
            return res.sendStatus(400)
        }

        const rentals = await db.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])
        if(rentals.rows.length === game.rows[0].stockTotal){ // game unavailable for rent
            return res.sendStatus(400)
        }

        let rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
        console.log(rentDate)
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
    } catch(err){
        res.status(500).send(err.message)
    }
}

export const finalizeRental = async (req, res) => {
    try{
        
    } catch(err){
        res.status(500).send(err.message)
    }
}

export const deleteRental = async (req, res) => {
    try{
        
    } catch(err){
        res.status(500).send(err.message)
    }
}