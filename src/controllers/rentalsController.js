import { db } from "../config/database.js"

export const getRentals = async (req, res) => {
    try{
        const rentals = await db.query('SELECT * FROM rentals;')
        res.send(rentals.rows);
    } catch(err){
        res.status(500).send(err.message)
    }
}

export const addRental = async (req, res) => {
    try{
        
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