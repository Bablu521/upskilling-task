import { Router } from "express";
const router = Router()
import * as orderController from "./order.controller.js"
import * as orderSchema from "./order.schema.js"
import { validation } from "../../middleware/validation.js";

//createOrder
router.post("/", validation(orderSchema.createOrder), orderController.createOrder)

//updateOrder
router.put("/:id", validation(orderSchema.updateOrder), orderController.updateOrder)

//deleteOrder
router.delete("/:id", validation(orderSchema.deleteOrder), orderController.deleteOrder)

//getAllOrders
router.get("/", orderController.getAllOrders)

//getSpecificOrder
router.get("/:id", validation(orderSchema.getSpecificOrder), orderController.getSpecificOrder)

export default router