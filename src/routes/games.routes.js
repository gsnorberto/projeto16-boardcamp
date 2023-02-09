import express from 'express'
let gamesRouter = express.Router()

import { getGames, addGame } from '../controllers/gamesController.js'
import { validateGameData } from '../middlewares/gamesMiddlewares.js'

gamesRouter.get('/games', getGames)
gamesRouter.post('/games', validateGameData, addGame)

export default gamesRouter