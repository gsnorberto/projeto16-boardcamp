import express from 'express'
import cors from 'cors'
import gamesRouter from './routers/games.routes.js'
import customersRouter from './routers/customers.routes.js'
import rentalsRouter from './routers/rentals.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use([customersRouter, gamesRouter, rentalsRouter])

let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})