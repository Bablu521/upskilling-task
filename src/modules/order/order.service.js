import productModel from "../../../DB/model/product.model.js"

export const calculateTotals = (products) => {
    let totalAmount = 0
    let totalPrice = 0
    for (let i = 0; i < products.length; i++) {
        totalAmount += products[i].quantity
        totalPrice += products[i].price
    }
    return { totalAmount, totalPrice }
}

export const updateStock = async (productId, quantity, createOrder) => {
    if (createOrder) {
        await productModel.findByIdAndUpdate(productId,
            { $inc: { stock: -quantity } })
    } else {
        await productModel.findByIdAndUpdate(productId,
            { $inc: { stock: quantity } })
    }
}


export const updateStockForDeletedOrder = async (products) => {
    for (const product of products) {
        await productModel.findByIdAndUpdate(product.productId,
            { $inc: { stock: product.quantity } }
        )
    }
}
