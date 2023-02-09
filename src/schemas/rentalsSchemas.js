import Joi from 'joi'

export const addRentalsSchema = Joi.object({
    customerId: Joi.string().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().required(),
})