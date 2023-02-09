import express from 'express'
let rentalsRouter = express.Router()

import { validateRentalData } from '../middlewares/rentalsMiddlewares.js'
import { getRentals, addRental, finalizeRental, deleteRental } from '../controllers/rentalsController.js'


rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateRentalData, addRental )
rentalsRouter.post('/rentals/:id/return', finalizeRental)
rentalsRouter.delete('/rentals/:id', deleteRental)

export default rentalsRouter