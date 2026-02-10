const express = require('express')
const jwt = require('jsonwebtoken')
// library that creates and verify tokens
const jwtPassword = '123456'

const app = express()
app.use(express.json())

// mock db
const ALL_USERS = [
  {
    username: 'john.doe@example.com',
    password: '123',
    name: 'John Doe',
  },
  {
    username: 'jane.doe@example.com',
    password: '12345',
    name: 'Jane Doe',
  },
  {
    username: 'robert.smith@example.com',
    password: '12345',
    name: 'Robert Smith',
  },
]

// this function checks credentials
function userExists(username, password) {
  let userExist = false

  ALL_USERS.find((user) => {
    if (user.username === username && user.password === password) {
      userExist = true
    }
  })

  return userExist
}

app.get('/', (req, res) => {
  res.send('GET is working')
})

// signin
app.post('/signin', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  // user sends the date, and we check if it exists and validate user
  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory db",
    })
  }

  // jwt.sign (payload, secret) is a function that takes a payload object and a secret string and returns a JWT token string. The payload object is typically used to store information about the user, such as their username or id, and the secret string is used to encrypt the token. The returned token string is a compact, URL-safe means of representing claims to be transferred between two parties. The token is digitally signed and contains a payload that can be verified and trusted.

  // creating token here, using payload and secret
  // JWT has 3 parts, header, payload, signature
  var token = jwt.sign({ username: username }, jwtPassword)
  return res.json({
    // sending token to client
    // frontend stores this token in local storage, as cookies or memory
    token,
  })
})

app.get('/users', function (req, res) {
  const token = req.headers.authorization
  try {
    // jwt.verify(token, secret, [options, callback]) is a function that takes a token string and a secret string and returns a decoded payload object. The payload object is typically used to store information about the user, such as their username or id.
    const decoded = jwt.verify(token, jwtPassword)
    const username = decoded.username
    //return other users
    const otherUsers = ALL_USERS.filter((user) => user.username != username)
    res.json(otherUsers)
  } catch (err) {
    return res.status(403).json({
      msg: 'Invalid token',
    })
  }
})

app.listen(3000, () => {
  console.log('App running on port 3000')
})
