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
                err.message = `validation.number_min ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `validation.number_max ${err.local.limit}`;
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

const errDate = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "date.empty":
                err.message = "validation.fieldRequired";
                break;
            case "date.base":
                err.message = "validation.errorDate";
                break;
            default:
                break;
        }
    });
    return errors;
}



const orSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    Client:Joi.string()
        .required()
        .error(errMessages),
    Mattress: Joi.string()
        .required()
        .error(errMessages),
    Amount: Joi
        .number().integer()
        .required()
        .error(errNumber),
    Status: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    ShippingCosts: Joi
        .number()
        .required()
        .min(10)
        .max(1000000)
        .error(errNumber),
    DepartureDate: Joi.date()
        .required()
        .min("now")
        .message("validation.lateDate")
        .error(errDate),
    OrderDate: Joi.date()
        .required()
        .min("01-01-2000")
        .max("now")
        .message("validation.dateMax")
        .error(errDate),
})

module.exports = orSchema;