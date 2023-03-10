import Joi from 'joi'

export const addGameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().required(),
    pricePerDay: Joi.number().required()
})