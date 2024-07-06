import { Router } from "express";
const router = Router()
import * as productController from "./product.controller.js"
import * as productSchema from "./product.schema.js"
import { validation } from "../../middleware/validation.js";

//createProduct
router.post('/', validation(productSchema.createProduct), productController.createProduct)

//updateProduct
router.put('/:id', validation(productSchema.updateProduct), productController.updateProduct)

//deleteProduct
router.delete('/:id', validation(productSchema.deleteProduct), productController.deleteProduct)

//getAllProducts
router.get('/', productController.getAllProducts)

//getSpecificProduct
router.get('/:id', validation(productSchema.getSpecificProduct), productController.getSpecificProduct)

export default router