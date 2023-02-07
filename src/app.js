import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/games.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use([gamesRouter])

let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})