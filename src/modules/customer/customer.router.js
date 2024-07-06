import { Router } from "express";
const router = Router()
import * as customerController from "./customer.controller.js"
import * as customerSchema from "./customer.schema.js"
import { validation } from "../../middleware/validation.js";

//signup
router.post("/signup", validation(customerSchema.signup), customerController.signup)

export default router