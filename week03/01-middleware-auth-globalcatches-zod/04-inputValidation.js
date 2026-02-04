// input validation

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('GET is working')
})

app.post('/health-checkup', (req, res) => { 
  // const email = req.body.email
  // const password = req.body.password
  const kidneys = req.body.kidneys
  const kidneyLength = kidneys.length

  res.send('You have ' + kidneyLength + ' kidneys')
  // res.send({
  //   response,
  // })
  console.log(response)
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
