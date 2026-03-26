const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

// Middleware to authenticate admin requests
function adminMiddleware(req, res, next) {
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

  // verifying token
  try {
    const decodedValue = jwt.verify(token, JWT_SECRET)
    if (decodedValue.username) {
      next()
    } else {
      res.status(403).json({ message: 'admin authentication failed' })
    }
  } catch (err) {
    res.status(403).json({ message: 'admin authentication failed' })
  }
}

module.exports = adminMiddleware
