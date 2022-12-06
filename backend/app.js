const path = require('path')
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

// serve the frontend
if (process.env.NODE_ENV === 'production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))

} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to my netflix project' })
    })
}

app.use(errorHandler)

app.listen(port, () => `app is listening on port ${port}`)