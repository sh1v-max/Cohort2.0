const jwt = require('jsonwebtoken')
const jwtPassword = 'secret'

const { z } = require('zod')

// generating a jwt for a user with the given username and password

// in this function, we will first validate the username and password using zod, and if they are valid, we will generate a jwt and return it... if they are not valid, we will return null
function signJwt(username, password) {
  const schema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
  })
  const payload = {
    username,
    password,
  }
  let result = schema.safeParse(payload)
  if (!result.success) {
    return null
  } else {
    return jwt.sign(payload, jwtPassword)
  }
}

// verifying a jwt token

function verifyJwt(token) {
  // Your code here
  try {
    jwt.verify(token, jwtPassword)
    return true
  } catch (error) {
    return false
  }
}

function decodeJwt(token) {
  try {
    const decoded = jwt.decode(token)
    if (!decoded) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
}
