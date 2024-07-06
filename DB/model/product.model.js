import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min: 2,
        max: 20
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 200
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

//inStock
productSchema.methods.inStock = function (requiredQuantity) {
    return this.stock >= requiredQuantity ? true : false
}

const productModel = mongoose.models.Product || model("Product", productSchema)

export default productModel;