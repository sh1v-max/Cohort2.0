// using zod with express

const express = require('express')
const app = express()
const zod = require('zod')
const schema = zod.array(zod.number())
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

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
