const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 8000
const { errorHandler } = require('./middlewares/errorMiddleWare')

//Database connection
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', require('./routes/userRoute'))

app.use(errorHandler)

app.listen(port, () => `app is listening on port ${port}`)