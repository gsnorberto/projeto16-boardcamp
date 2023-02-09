import { addCustomerSchema } from "../schemas/customersSchemas.js"

export const validateCustomerData = (req, res, next) => {
    if(!req.body.name || req.body.name.trim().length === 0) {
        return res.sendStatus(400);
    }
    
    try {
        const { error } = addCustomerSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        res.sendStatus(400)
    }
}

