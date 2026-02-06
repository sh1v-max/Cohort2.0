const express = require('express')

const app = express()

app.get('/', function (req, res) {
  console.log(req.body.kidneys.length)
  res.json({
    msg: 'done',
  })
})

// if you just do this, end user will see "cannot read properties of undefined (reading "kidneys")

// to control this, we use global catches

app.use(function (err, req, res, next) {
  res.sent({
    msg: 'internal error',
  })
})
// still an exception is thrown above, but now global catch is handling it
// we will get  { msg: "internal error" }

app.listen(3000)
