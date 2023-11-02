const Joi = require("joi");

const errMessages = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = "validation.fieldRequired";
                break;
            case "string.min":
                err.message = `validation.string_min ${err.local.limit}`;
                break;
            case "string.max":
                err.message = `validation.string_max ${err.local.limit}`;
                break;
            case "string.email":
                err.message = "validation.errorEmail";
                break;
            default:
                break;
        }
    });
    return errors;
}


const clSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    Name:Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages),
    Surname: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages),
    Adres: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages),
    email: Joi.string()
        .email()
        .required()
        .error(errMessages),
    PhoneNumber: Joi.string()
        .optional()
        .allow("")
        .max(15)
        .message("validation.errorPhoneLength")
        .pattern(/^[+]?\d+$/)
        .message("validation.errorPhone"),
    password: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages),
        
})

module.exports = clSchema;