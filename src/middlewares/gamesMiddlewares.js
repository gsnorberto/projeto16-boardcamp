import { addGameSchema } from "../schemas/gamesSchemas.js"
import { stripHtml } from "string-strip-html"

export const validateGameData = (req, res, next) => {
    try {
        let name = stripHtml(req.body.name.trim()).result
        let image = stripHtml(req.body.image.trim()).result
        let stockTotal = stripHtml(req.body.stockTotal.trim()).result
        let pricePerDay = stripHtml(req.body.pricePerDay.trim()).result

        let data = { name, image, stockTotal, pricePerDay }
        const { error } = addGameSchema.validate(data)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}