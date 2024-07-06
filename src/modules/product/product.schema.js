import joi from "joi"
import { validObjectId } from "../../middleware/validation.js"

//createProduct
export const createProduct = joi.object({
    name: joi.string().min(2).max(20).required(),
    description: joi.string().min(5).max(200).required(),
    price: joi.number().positive().min(1).required(),
    stock: joi.number().integer().positive().min(1).required(),
}).required()

//updateProduct
export const updateProduct = joi.object({
    id: joi.string().custom(validObjectId).required(),
    name: joi.string().min(2).max(20),
    description: joi.string().min(5).max(200),
    price: joi.number().positive().min(1),
    stock: joi.number().integer().positive().min(1),
}).required()

//deleteProduct
export const deleteProduct = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()

//getSpecificProduct
export const getSpecificProduct = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()