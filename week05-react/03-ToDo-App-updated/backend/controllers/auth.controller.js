const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')

const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your-super-secret-key-123',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    },
  )
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  })
}

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  })

  createSendToken(newUser, 201, res)
})

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400))
  }

  // check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  // if everything ok, send token to client
  createSendToken(user, 200, res)
})
