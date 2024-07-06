import joi from "joi"
import { validObjectId } from "../../middleware/validation.js"

//createOrder
export const createOrder = joi.object({
    productId: joi.string().custom(validObjectId).required(),
    quantity: joi.number().integer().positive().min(1).required(),
    customerId: joi.string().custom(validObjectId).required()
}).required()

//updateOrder
export const updateOrder = joi.object({
    id: joi.string().custom(validObjectId).required(),
    productId: joi.string().custom(validObjectId).required(),
    quantity: joi.number().integer().positive().min(1).required()
}).required()

//deleteOrder
export const deleteOrder = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()

//getSpecificOrder
export const getSpecificOrder = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()