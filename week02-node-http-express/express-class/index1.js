const express = require('express')
const app = express()

// creating dummy data, we will use data like this
// till we learn DB
const users = [
  {
    name: 'kirat',
    kidneys: [
      {
        healthy: false,
        description: 'Left kidney',
      },
      {
        healthy: false,
        description: 'Right kidney',
      },
    ],
  },
]

app.use(express.json())

// method is different, while the routes remains same
// get, get number of kidneys, healthy and unhealthy
app.get('/', function (req, res) {
  const userKidneys = users[0].kidneys
  // console.log(userKidneys);
  const numberOfKidneys = userKidneys.length

  let numberOfHealthyKidneys = 0
  for (let i = 0; i < userKidneys.length; i++) {
    if (userKidneys[i].healthy) {
      numberOfHealthyKidneys = numberOfHealthyKidneys + 1
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  })
})

// post, send data in the body
// Every time we make a POST request the kidney is added
app.post('/', function (req, res) {
  console.log(req.body)
  const isHealthy = req.body.isHealthy
  users[0].kidneys.push({
    healthy: isHealthy,
  })
  res.json({
    msg: 'POST Done',
  })
})
// To make a POST request use POSTMAN
// {"isHealthy": true}  -> type under body section of POSTMAN
// Now after making 4-5 POST request the numberOfKidneys get increases (check in localhost)

// put - user can replace a kidney, make it healthy
app.put('/', function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true
  }
  // always send some response or else request will hand
  res.json({
    msg: 'PUT Done!',
  })
})

// delete, user can remove a unHealthy kidneys
app.delete('/', function (req, res) {
  // we will check if there's any unhealthy kidney
  if (isThereAtLeastOneUnhealthyKidney()) {
    // create a new array with only healthy kidneys
    const newKidneys = []
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        })
      }
    }
    // replace old kidneys with newKidneys
    users[0].kidneys = newKidneys
    res.json({
      msg: 'DELETE Done!',
    })
  } else {
    // we can sent error status code as shown below
    res.status(411).json({
      msg: 'You have no bad Kidneys',
    })
  }
})

// only if at least one unhealthy kidney is there else return 411
function isThereAtLeastOneUnhealthyKidney() {
  // this function checks if there's any unhealthy kidney
  let atLeastOneUnhealthyKidney = false
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atLeastOneUnhealthyKidney = true
    }
  }
  return atLeastOneUnhealthyKidney
}

app.listen(3000, () => {
  console.log('Server is listening on port 3000...')
})
