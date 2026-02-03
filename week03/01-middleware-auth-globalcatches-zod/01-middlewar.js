// notice how we're repeating the same authentication logic in both routes
// this is not efficient and violates the DRY (Don't Repeat Yourself) principle
// we can use middleware to handle the authentication logic in one place

// that's where we use middleware
// middleware is a function that runs between the request and the response
// it can be used for authentication, logging, etc
// here we will create a simple middleware for authentication

const express = require('express')
const app = express()

app.get('/health-checkup', (req, res) => {
  // doing simple authentication
  const username = req.headers.username
  const password = req.headers.password
  const kidneyId = req.query.kidneyId

  if (username === 'admin' && password === 'admin') {
    if (kidneyId === '1' || kidneyId === '2') {
      return res.json({
        status: 'success',
        message: 'Your Kidney is Fine!',
      })
    } else {
      return res.json({
        status: 'Failed',
        message: 'Bad Input!',
      })
    }
  }

  return res.status(401).json({
    status: 'Something unexpected happened!',
    message: 'Unauthorized',
  })
})

app.put('/replace-kidney', (req, res) => {
  const username = req.headers.username
  const password = req.headers.password
  const kidneyId = req.query.kidneyId

  if (username === 'admin' && password === 'admin') {
    if (kidneyId === '1' || kidneyId === '2') {
      return res.json({
        status: 'success',
        message: 'Healthy',
      })
    } else {
      return res.json({
        status: 'Failed',
        message: 'Bad Input!',
      })
    }
  } else {
    return res.status(401).json({
      status: 'Something unexpected happened!',
      message: 'Unauthorized',
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

// npm init -y
// npm install express
// run - node 01-middleware.js
// url - localhost:3000/health-checkup?kidneyId=1 (change kidneyId to 2 and 3 to see different outputs)
// headers - username: admin, password: admin (use postman)
// do postman to test the api
// sent get request to the url http://localhost:3000/health-checkup?kidneyId=1
// add headers - username: admin, password: admin
