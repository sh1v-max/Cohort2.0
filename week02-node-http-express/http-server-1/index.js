// express Basic - creating a HTTP server
// to install - npm install express

const express = require('express')
// call the express fun, it will give you an app object
// app is our server instance
const app = express()
const port = 3000

app.use(express.json()) 
// middleware to parse JSON request bodies
// without it, req.body will be undefined for JSON requests
// we can do the same using body-parser package
// npm install body-parser
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// the above line does the same thing as express.json()

// this is a route handle for GET request on root route
app.get('/', (req, res) => {
  // req is the request object
  // res is the response object
  res.send(`hello world`)
})

app.post('/conversations', (req, res) => {
  console.log("=====body=====")
  console.log(req.body)
  console.log("=====headers=====")
  console.log(req.headers)
  res.send({
    msg: 'POST request to /conversations received',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// this is a very basic nodejs express server
// to run- node index.js - open localhost:3000

// create a todo app that lets users store todos on the server
