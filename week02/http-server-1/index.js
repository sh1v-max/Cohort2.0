// express Basic - creating a HTTP server
// to install - npm install express

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`hello world`)
})

app.listen(port)

// this is a very basic nodejs express server
// to run- node index.js - open localhost:3000

// create a todo app that lets users store todos on the server