const { Admin } = require('../db')

// Middleware to authenticate admin requests
async function adminMiddleware(req, res, next) {
  // Extract credentials from request headers
  const username = req.headers.username
  const password = req.headers.password

  if (!username || !password) {
    return res.status(403).json({ message: 'missing credentials' })
  }

  // Query DB to find match for these credentials
  const admin = await Admin.findOne({ username, password })
  if (admin) {
    next()
  } else {
    res.status(403).json({ message: 'admin authentication failed' })
  }
}

module.exports = adminMiddleware
