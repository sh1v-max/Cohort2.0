// what is global catch?
// a global catch is a middleware that catches all the errors in the application and sends a response to the user

const express = require('express')
const app = express()

app.use(express.json())

// route to test input validation
app.post('/health-checkup', function (req, res, next) {
  // kidneys = [1,2] - type in body of postman and use POST method
  const kidneys = req.body.kidneys

  // passing error to global catch
  if (!kidneys) {
    return next(new Error('kidneys are required'))
  }

  const kidneysLength = kidneys.length

  res.send('You have ' + kidneysLength + ' kidneys')
})

// using global catch
// global catch works only when there is an error and it is passed to next()
// how to pass error?
// - we can throw error
// - we call call next(err)
// - async error forwarded with next(err)
// express catches sync errors automatically but async errors need to be forwarded with next(err)
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    message: 'sorry, something is up with our server',
  })
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
