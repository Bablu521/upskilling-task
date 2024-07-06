import mongoose, { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    age: Number
})

const customerModel = mongoose.models.Customer || model("Customer", customerSchema)

export default customerModel;