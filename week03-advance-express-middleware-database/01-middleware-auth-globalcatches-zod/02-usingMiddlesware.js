// here, we will demonstrate how to use middleware in express.js
// route handler is a middleware function that can perform operations on the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

const express = require('express')
const app = express()

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

// another useCase of middleware
// using middleware to calculate the number of requests
// must use before defining the routes, otherwise it will not work

// creating calculateRequest middleware
let numberOfRequest = 0
function calculateRequest(req, res, next) {
  numberOfRequest++
  console.log(`==============================`)
  console.log(`Number of requests: ${numberOfRequest}`)
  next()
}

// what is app.use?
// app.use is a method to mount middleware functions at a specified path
// if no path is specified, it defaults to "/"
// it will be executed for every request to the app
//~ app.use(calculateRequest)
// it means any route that is called after this line will go through calculateRequest middleware first
//~ that's why we always use app.use(express.json()) to parse the body of the request before defining any routes

// -----------------response time middleware-----------------
// we will create a middleware to calculate the response and average response time of the server
let totalRequests = 0
let totalTime = 0

function responseTimeMiddleware(req, res, next) {
  const start = Date.now()

  // as normal middleware passes control to next middleware or route handler using next()
  // here we are using res.on("finish") to calculate the response time after the response is sent
  // res is an event emitter, it can emit events and we can listen to those events
  // res.on is used to listen to events on the res object
  // one of them is "finish" which is emitted when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start
    totalRequests++
    totalTime += duration

    const averageTime = totalTime / totalRequests
    console.log(`Response time: ${duration}ms`)
    console.log(`Average response time: ${averageTime.toFixed(2)}ms`)
  })

  next()
}

app.use(responseTimeMiddleware)

// using middleware to check if the user is logged in or not
// a route can have multiple middleware functions
app.get(
  '/health-checkup',
  userMiddleware,
  kidneyMiddleware,
  calculateRequest,
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
  calculateRequest,
  function (req, res) {
    // do kidney check here
  },
)

app.get('/heart-checkup', userMiddleware, function (req, res) {
  // do heart check here
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
