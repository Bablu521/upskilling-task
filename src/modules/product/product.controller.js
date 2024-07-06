import productModel from "../../../DB/model/product.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

//createProduct
export const createProduct = asyncHandler(async (req, res, next) => {
    const { name, description, price, stock } = req.body
    const checkName = await productModel.findOne({ name })
    if (checkName) {
        return next(new Error("Product already Exist", { cause: 400 }))
    }
    const product = await productModel.create({ name, description, price, stock })
    return res.status(201).json({ message: "Done", product })
})

//updateProduct
export const updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) {
        return next(new Error("Product Not Found", { cause: 404 }))
    }
    product.name = req.body.name ? req.body.name : product.name
    product.description = req.body.description ? req.body.description : product.description
    product.price = req.body.price ? req.body.price : product.price
    product.stock = req.body.stock ? req.body.stock : product.stock
    await product.save()
    return res.status(200).json({ message: "Done", product })
})

//deleteProduct
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) {
        return next(new Error("Product Not Found", { cause: 404 }))
    }
    await product.deleteOne()
    return res.status(200).json({ message: "Done", product })
})

//getAllProducts
export const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find()
    if (!products.length) {
        return next(new Error("No Product Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", products })
})

//getSpecificProduct
export const getSpecificProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) {
        return next(new Error("Product Not Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", product })
})