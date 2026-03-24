const { User } = require('../db')

// Middleware to authenticate user requests
async function userMiddleware(req, res, next) {
  // Extract credentials from request headers
  const username = req.headers.username
  const password = req.headers.password

  if (!username || !password) {
    return res.status(403).json({ message: 'missing credentials' })
  }

  // Look for the user in the database matching these credentials
  const user = await User.findOne({ username, password })
  if (user) {
    // Attach the authenticated user object to request so downstream routes can use it
    req.user = user
    next()
  } else {
    res.status(403).json({ message: 'user authentication failed' })
  }
}

module.exports = userMiddleware
 