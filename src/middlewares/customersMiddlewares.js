import { addCustomerSchema } from "../schemas/customersSchemas.js"

export const validateCustomerData = (req, res, next) => {
    try {
        const { error } = addCustomerSchema.validate(req.body)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}

