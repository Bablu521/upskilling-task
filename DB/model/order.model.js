import mongoose, { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    customerId: {
        type: Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [
        {
            productId: { type: Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, min: 1 }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    totalAmount: {
        type: Number,
        min: 1
    },
    totalPrice: {
        type: Number,
        min: 1
    }
}, { timestamps: true });

const orderModel = mongoose.models.Order || model("Order", orderSchema);

export default orderModel;