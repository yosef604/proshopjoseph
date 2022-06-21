import express from 'express'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import userRouter from './routes/userRoute.js'
import uploadsRouter from './routes/uploadFiles.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadsRouter)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})


const __dirname = path.resolve()
app.use('/uploadsFolder', express.static(
    path.join(__dirname, '/uploadsFolder')
))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html')
    ))
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is runnig in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))