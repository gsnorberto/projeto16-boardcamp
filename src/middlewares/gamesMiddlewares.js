import { addGameSchema } from "../schemas/gamesSchemas.js"

export const validateGameData = (req, res, next) => {
    try {
        const { error } = addGameSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}