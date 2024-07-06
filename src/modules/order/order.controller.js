import orderModel from "../../../DB/model/order.model.js";
import productModel from "../../../DB/model/product.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { calculateTotals, updateStock, updateStockForDeletedOrder } from "./order.service.js";

//createOrder
export const createOrder = asyncHandler(async (req, res, next) => {
    const { productId, quantity, customerId } = req.body
    const checkProduct = await productModel.findById(productId)
    if (!checkProduct) {
        return next(new Error("Product Not Found", { cause: 404 }))
    }
    if (!checkProduct.inStock(quantity)) {
        return next(new Error(`only ${checkProduct.stock} Items are Available`, { cause: 400 }))
    }
    const existOrder = await orderModel.findOne({ customerId })
    if (!existOrder) {
        //create new order
        const order = await orderModel.create({
            customerId,
            products: [{ productId, quantity, price: checkProduct.price * quantity }],
        })
        const { totalAmount, totalPrice } = calculateTotals(order.products)
        order.totalAmount = totalAmount
        order.totalPrice = totalPrice
        await order.save()
        updateStock(productId, quantity, true)
        return res.status(201).json({ message: "Done", order })
    }
    const productInOrder = await orderModel.findOne({ customerId, "products.productId": productId })
    // add to exist product in existing order
    if (productInOrder) {
        const isProduct = productInOrder.products.find((prod) => {
            return prod.productId.toString() == productId.toString()
        })
        if (checkProduct.inStock(quantity)) {
            isProduct.quantity = isProduct.quantity + quantity
            isProduct.price = isProduct.quantity * checkProduct.price
            const { totalAmount, totalPrice } = calculateTotals(productInOrder.products)
            productInOrder.totalAmount = totalAmount
            productInOrder.totalPrice = totalPrice
            productInOrder.orderDate = new Date()
            await productInOrder.save()
            updateStock(productId, quantity, true)
            return res.status(200).json({ message: "Done", productInOrder })
        }
        return next(new Error(`only ${checkProduct.stock} Items are Available`, { cause: 400 }))

    }
    // add new product to existing order
    const addToExistOrder = await orderModel.findOneAndUpdate({ customerId },
        { $push: { products: { productId, quantity, price: checkProduct.price * quantity } } },
        { new: true })
    const { totalAmount, totalPrice } = calculateTotals(addToExistOrder.products)
    addToExistOrder.totalAmount = totalAmount
    addToExistOrder.totalPrice = totalPrice
    await addToExistOrder.save()
    updateStock(productId, quantity, true)
    return res.status(201).json({ message: "Done", addToExistOrder })
})

//updateOrder
export const updateOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { productId, quantity } = req.body
    const checkOrder = await orderModel.findOne({ _id: id, "products.productId": productId })
    if (!checkOrder) {
        return next(new Error("Order Not Found", { cause: 404 }))
    }
    const isProduct = checkOrder.products.find((prod) => {
        return prod.productId.toString() == productId.toString()
    })
    const checkProduct = await productModel.findById(productId)
    if (!checkProduct) {
        return next(new Error("Product Not Found", { cause: 404 }))
    }
    if (!checkProduct.inStock(quantity - (isProduct.quantity))) {
        return next(new Error(`only ${checkProduct.stock} Items are Available`, { cause: 400 }))
    }
    const order = await orderModel.findOneAndUpdate({ _id: id, "products.productId": productId },
        { "products.$.quantity": quantity, "products.$.price": checkProduct.price * quantity },
        { new: true })
    //return previous quantity to stock
    updateStock(productId, isProduct.quantity, false)
    const { totalAmount, totalPrice } = calculateTotals(order.products)
    order.totalAmount = totalAmount
    order.totalPrice = totalPrice
    await order.save()
    updateStock(productId, quantity, true)
    return res.status(200).json({ message: "Done", order })
})

//deleteOrder
export const deleteOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id)
    if (!order) {
        return next(new Error("Order Not Found", { cause: 404 }))
    }
    updateStockForDeletedOrder(order.products)
    await order.deleteOne()
    return res.status(200).json({ message: "Done", order })
})

//getAllOrders
export const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find().populate([
        {
            path: "customerId",
            select: "name address"
        }
    ])
    if (!orders.length) {
        return next(new Error("No Order Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", orders })
})

//getSpecificOrder
export const getSpecificOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id)
    if (!order) {
        return next(new Error("Order Not Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", order })
})
