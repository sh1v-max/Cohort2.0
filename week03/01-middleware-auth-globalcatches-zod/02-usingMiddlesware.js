// here, we will demonstrate how to use middleware in express.js
// route handler is a middleware function that can perform operations on the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

const express = require('express')
const app = express()

// creating calculateRequest middleware
let numberOfRequest = 0
function calculateRequest(req, res, next) {
  numberOfRequest++
  console.log(numberOfRequest)
  next()
}

// defining middleware (just another function)
// next is a function that will be called to pass control to the next middleware
function userMiddleware(req, res, next) {
  const username = req.headers.username
  const password = req.headers.password

  if (username === 'admin' && password === 'admin') {
    next()
  } else {
    res.status(401).json({
      status: 'Failed',
      message: 'Unauthorized',
    })
  }
}

function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId

  if (kidneyId === '1' || kidneyId === '2') {
    next()
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'Bad Input!',
    })
  }
}

// using middleware to calculate the number of requests
// must use before defining the routes, otherwise it will not work
app.use(calculateRequest)

// using middleware to check if the user is logged in or not
// a route can have multiple middleware functions
app.get(
  '/health-checkup',
  userMiddleware,
  kidneyMiddleware,
  function (req, res) {
    res.json({
      status: 'success',
      message: 'Your Kidney is Fine!',
    })
  },
)

app.get(
  '/kidney-checkup',
  userMiddleware,
  kidneyMiddleware,
  function (req, res) {
    // do kidney check here
  },
)

app.get('/heart-checkup', userMiddleware, function (req, res) {
  // do heart check here
})

app.listen(3000)
