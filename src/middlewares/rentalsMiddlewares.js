import { addRentalsSchema } from "../schemas/rentalsSchemas.js"

export const validateRentalData = (req, res, next) => {
    try {
        const { error } = addRentalsSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}