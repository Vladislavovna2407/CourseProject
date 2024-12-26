import "./config.js"
import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import templateRoutes  from './routes/template.js'
import { basicAuth } from './utils/basicAuth.js'
import { adminOnly } from "./utils/adminOnly.js";

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(authRoutes)
app.use('/users', basicAuth, adminOnly, userRoutes)
app.use('/templates', templateRoutes)

app.get((req, res) => {
    res.status(404).send('Page not found')
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusCode,
        message: error.message,
        errors: error.errors
    })
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}`)
})