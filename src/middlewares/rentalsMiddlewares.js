import { addRentalsSchema } from "../schemas/rentalsSchemas.js"
import { stripHtml } from "string-strip-html"

export const validateRentalData = (req, res, next) => {
    try {
        let customerId = stripHtml(req.body.customerId.trim()).result
        let gameId = stripHtml(req.body.gameId.trim()).result
        let daysRented = stripHtml(req.body.daysRented.trim()).result

        let data = { customerId, gameId, daysRented }
        const { error } = addRentalsSchema.validate(data)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}