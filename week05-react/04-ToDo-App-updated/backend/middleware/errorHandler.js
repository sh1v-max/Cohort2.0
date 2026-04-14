const AppError = require('../utils/AppError')

const handleZodError = (err) => {
  const errors = err.issues.map(
    (issue) => `${issue.path.join('.')}: ${issue.message}`,
  )
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg
    ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    : 'Duplicate field'
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let error = Object.assign(err)
  error.message = err.message

  if (error.name === 'ZodError') error = handleZodError(error)
  if (error.code === 11000) error = handleDuplicateFieldsDB(error)
  if (error.name === 'JsonWebTokenError')
    error = new AppError('Invalid token. Please log in again!', 401)
  if (error.name === 'TokenExpiredError')
    error = new AppError('Your token has expired! Please log in again.', 401)

  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  } else {
    console.error('ERROR 💥', err)
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

module.exports = errorHandler
