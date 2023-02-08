import { addCustomerSchema } from "../schemas/customersSchemas.js"
import { stripHtml } from "string-strip-html"

export const validateCustomerData = (req, res, next) => {
    try {
        let name = stripHtml(req.body.name.trim()).result
        let phone = stripHtml(req.body.phone.trim()).result
        let cpf = stripHtml(req.body.cpf.trim()).result
        let birthday = stripHtml(req.body.birthday.trim()).result

        let data = { name, phone, cpf, birthday }
        const { error } = addCustomerSchema.validate(data)
                                                                
        if (error == null) {
            next();
        } else {
            res.status(422).json({ error: "Dados inválidos" });
        }
    } catch (err) {
        res.status(422).json({ error: "Dados inválidos" });
    }
}

