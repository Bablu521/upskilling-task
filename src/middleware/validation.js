import { Types } from "mongoose"

export const validObjectId = (value, helpher) => {
    if (Types.ObjectId.isValid(value)) {
        return true
    }
    return helpher.message("In Valid ObjectId")
}

export const validation = (joiSchema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.query, ...req.params }
        const validationResult = joiSchema.validate(data, { abortEarly: false })
        if (validationResult.error) {
            return res.status(400).json({ message: "Validation Error", validationError: validationResult.error.details })
        }
        return next()
    }
}