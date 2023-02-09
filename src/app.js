import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/games.routes.js'
import customersRouter from './routes/customers.routes.js'
import rentalsRouter from './routes/rentals.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use([customersRouter, gamesRouter, rentalsRouter])

let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})