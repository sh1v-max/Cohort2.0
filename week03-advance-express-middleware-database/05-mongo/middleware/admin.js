const { Admin } = require('../db')

async function adminMiddleware(req, res, next) {
  const username = req.headers.username
  const password = req.headers.password

  if (!username || !password) {
    return res.status(403).json({ message: 'missing credentials' })
  }

  const admin = await Admin.findOne({ username, password })
  if (admin) {
    next()
  } else {
    res.status(403).json({ message: 'admin authentication failed' })
  }
}

module.exports = adminMiddleware
