import customerModel from "../../../DB/model/customer.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bcrypt from "bcryptjs"


//signup
export const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone, address, age } = req.body
    const checkEmail = await customerModel.findOne({ email })
    if (checkEmail) {
        return next(new Error("Email already Exist", { cause: 409 }))
    }
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const customer = await customerModel.create({ name, email, password: hashPassword, phone, address, age })
    return res.status(201).json({ message: "Done", customer })
})