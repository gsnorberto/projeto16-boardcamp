import { addGameSchema } from "../schemas/gamesSchemas.js"

export const validateGameData = (req, res, next) => {
    try {
        const { error } = addGameSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            if(error.message === '"name" is required') return res.sendStatus(400);

            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}