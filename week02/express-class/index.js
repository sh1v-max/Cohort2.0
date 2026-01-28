// do git init
// npm init -y
// npm install express

const express = require('express')

// this line is creating an express application
//! important
const app = express()

function sum(n) {
  let ans = 0
  for (let i = 0; i <= n; i++) {
    ans += i
  }
  return ans
}

// app takes two arguments
// what route/url/path to listen
// and what function to call when that route is requested
// req, res => request, response
app.get('/', function (req, res) {
  const n = req.query.n
  const ans = sum(n)
  res.send('Hi There Sum is: ' + ans)
  // always send string as response, not numbers
  // because response is text
})

// this line is starting a server at port 3000
// !important
app.listen(3000)

// open browser, localhost:3000/?n=20  (after ? - there is query parameters)
// add whatever value of n to see the sum from 0 to n
