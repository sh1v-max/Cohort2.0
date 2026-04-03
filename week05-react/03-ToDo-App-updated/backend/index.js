require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')

const AppError = require('./utils/AppError')
const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// Global Middlewares
app.use(cors())
app.use(express.json({ limit: '10kb' }))

// Rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/todos', todoRoutes)

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global Error Handler
app.use(errorHandler)

// DB Connection
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/'

mongoose
  .connect(`${MONGO_URI}todos`)
  .then(() => {
    console.log('DB connection successful!')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('DB connection failed:', err)
    process.exit(1)
  })
