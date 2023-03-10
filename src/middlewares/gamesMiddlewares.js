import { addGameSchema } from "../schemas/gamesSchemas.js"

export const validateGameData = (req, res, next) => {
    if(!req.body.name || req.body.name.trim().length === 0) {
        return res.sendStatus(400);
    }
    
    try {
        const { error } = addGameSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.sendStatus(400)
    }
}