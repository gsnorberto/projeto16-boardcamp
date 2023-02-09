import { addRentalsSchema } from "../schemas/rentalsSchemas.js"

export const validateRentalData = (req, res, next) => {
    try {
        const { error } = addRentalsSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.sendStatus(400)
    }
}