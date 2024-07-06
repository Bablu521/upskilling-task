import express from 'express'
const app = express()
import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import initApp from './src/index.router.js'
const port = process.env.PORT || 5000

initApp(app, express)
app.listen(port, () => console.log(`Server is Running on PORT ${port}`))