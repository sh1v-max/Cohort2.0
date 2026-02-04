// input validation
// we want to make sure that the input we get from the user is valid
// doing all checks manually can be tedious and error-prone
// we can use libraries like Zod of Joi to help us with input validation
// npm install zod

const express = require('express')
const app = express()
const zod = require('zod')
const port = 3000
// creating a schema for array of numbers
// describing the structure of the input
const schema = zod.array(zod.number())

// {
//     email: String
//     password: number
//     country:'IN' 'US'
// }

// this is the schema for the object which we want to validate
const schema2 = zod.object({
  email: zod.string(),
  password: zod.string(),
  country: zod.literal('IN').or(zod.literal('US')),
  kidney: zod.array(zod.number()),
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send('GET is working')
})

app.post('/health-checkup', (req, res) => {
  // const email = req.body.email
  // const password = req.body.password
  const kidneys = req.body.kidneys
  // const response = schema2.safeParse(req.body)
  // we passes the input to the schema
  // schema.safeParse is calling the parse method
  // it checks if the input is valid or not
  // and returns the success as true or false
  const response = schema.safeParse(kidneys)
  if (!response.success) {
    res.status(411).json({
      msg: 'Please give the valid inputs',
    })
  } else {
    res.send({
      response,
    })
  }

  // console.log(response)
})

app.listen(port, () => {
  console.log('App is running on port ' + port)
})
