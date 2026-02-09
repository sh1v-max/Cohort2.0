const express = require('express')
const app = express()

const requestLog = {}

function rateLimiter(req, res, next) {
  const ip = req.ip
  const limit = 6 * 1000 // 6 sec
  const maxReq = 5

  if (!requestLog[ip]) {
    requestLog[ip] = {
      count: 1,
      startTime: Date.now(),
    }
    return next()
  }

  const currentTime = Date.now()
  const timePassed = currentTime - requestLog[ip].startTime

  if (timePassed < limit) {
    requestLog[ip].count++

    if (requestLog[ip].count > maxReq) {
      return res.status(429).json({
        message: 'too many requests',
      })
    }
  } else {
    requestLog[ip] = {
      count: 1,
      startTime: currentTime,
    }
  }

  next()
}

app.use(rateLimiter)

app.get('/', (req, res) => {
  res.send('get is working')
})

app.listen(3000, () => {
  console.log('sever is running at port 3000')
})
