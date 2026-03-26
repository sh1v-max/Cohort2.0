const { User } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

// Middleware to authenticate user requests
async function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'missing credentials or invalid format' })
  }

  // getting token
  // token usually looks like "Bearer <token>"
  // so we split the string by space and take the second element
  // ["Bearer", "<token>"]
  const words = authHeader.split(" ")
  const token = words[1]

  try {
    const decodedValue = jwt.verify(token, JWT_SECRET)
    if (decodedValue.username) {
      // look for the user in the database to attach full user object
      const user = await User.findOne({ username: decodedValue.username })
      if (user) {
        req.user = user
        next()
      } else {
        res.status(403).json({ message: 'user not found' })
      }
    } else {
      res.status(403).json({ message: 'user authentication failed' })
    }
  } catch (err) {
    res.status(403).json({ message: 'user authentication failed' })
  }
}

module.exports = userMiddleware
