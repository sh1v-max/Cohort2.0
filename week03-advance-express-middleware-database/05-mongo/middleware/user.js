const { User } = require('../db')

async function userMiddleware(req, res, next) {
  const username = req.headers.username
  const password = req.headers.password

  if (!username || !password) {
    return res.status(403).json({ message: 'missing credentials' })
  }

  const user = await User.findOne({ username, password })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(403).json({ message: 'user authentication failed' })
  }
}

module.exports = userMiddleware
 