import joi from "joi"

//signup
export const signup = joi.object({
    name: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().required(),
    age: joi.number().required()
}).required()