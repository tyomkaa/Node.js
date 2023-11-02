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
            default:
                break;
        }
    });
    return errors;
}

const errNumber = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "number.min":
                err.message = `validation.price_min ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `validation.price_max ${err.local.limit}`;
                break;
            case "number.base":
                err.message = `validation.errorNumber`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const matSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    Name:Joi.string()
        .min(2)
        .max(40)
        .required()
        .error(errMessages),
    Type: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages),
    Size: Joi
        .number()
        .required()
        .error(errNumber),
    Description: Joi.string()
        .min(2)
        .max(150)
        .required()
        .error(errMessages),
    Price: Joi
        .number()
        .min(500)
        .max(1000000)
        .required()
        .error(errNumber)
})

module.exports = matSchema;