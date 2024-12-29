import "./config.js"
import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import templateRoutes from './routes/template.js'
import { basicAuth } from './utils/basicAuth.js'
import { adminOnly } from "./utils/adminOnly.js";
// создается экхемпляр приложения
const app = express()
    //  app.use(cors()) - подключает мидлвэр , который позволяетсерверу обрабатывать запросы с других доменов
app.use(cors())
    // также мтдлэвар для парсингла JSON запросов. позволяющие приложению обрабатывать входящие данные в формате JSON
app.use(bodyParser.json())
    // полкдючает маршруты аутентицикаии 
app.use(authRoutes)
    // подключаю маршруты для работы с пользователями, basicAuth проверяет базовую аутентицикауию, а админоли проверяет или является админом
app.use('/users', basicAuth, adminOnly, userRoutes)
    //подключаю маршруты для работы с шаблонами
app.use('/templates', templateRoutes)

app.get((req, res) => {
        res.status(404).send('Page not found')
    })
    //для обрабртки ошибок
app.use((error, req, res, next) => {
        res.status(error.statusCode || 500).json({
            status: error.statusCode,
            message: error.message,
            errors: error.errors
        })
    })
    //запуск сервера по порту , укаазнному в переменной окружения сервер порт
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}`)
})