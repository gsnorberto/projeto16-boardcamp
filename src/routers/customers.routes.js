import express from 'express'
let customersRouter = express.Router()
import { getCustomers, getCustomerById, addCustomer, updateCustomer } from "../controllers/customersController.js"
import { validateCustomerData } from '../middlewares/customersMiddlewares.js'

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getCustomerById)
customersRouter.post('/customers', validateCustomerData, addCustomer)
customersRouter.put('/customers/:id', validateCustomerData, updateCustomer)

export default customersRouter