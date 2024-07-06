import connectDB from './../DB/connection.js';
import customerRouter from "./modules/customer/customer.router.js"
import productRouter from "./modules/product/product.router.js"
import orderRouter from "./modules/order/order.router.js"
import cors from "cors"
import { globalErrorHandling } from './utils/errorHandling.js';

const initApp = (app, express) => {
    connectDB()
    app.use(cors())
    app.use(express.json())

    app.get("/", (req, res, next) => {
        return res.json({ message: "Welcome upskilling-task" })
    })
    app.use("/customer", customerRouter)
    app.use("/product", productRouter)
    app.use("/order", orderRouter)
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: "In Valid Routing" })
    })
    app.use(globalErrorHandling)
}

export default initApp;