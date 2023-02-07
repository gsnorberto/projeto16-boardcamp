import express from 'express'
let gamesRouter = express.Router()

gamesRouter.get('/ola', (req, res) => {res.send("Hello!")})

export default gamesRouter