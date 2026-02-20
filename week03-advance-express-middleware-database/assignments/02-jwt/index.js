const jwt = require('jsonwebtoken')
const jwtPassword = 'secret'

const { z } = require('zod')

// generating a jwt for a user with the given username and password

// in this function, we will first validate the username and password using zod, and if they are valid, we will generate a jwt and return it... if they are not valid, we will return null
function signJwt(username, password) {
  // validating the username and password using zod
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
    // else, we will generate a jwt and return it
    return jwt.sign(payload, jwtPassword)
  }
}

// decoding a jwt token, here we will return true if the token is valid,
// and false if it is not valid... note that this function should not throw an error,
// it should return false if the token is not valid, and true if it is valid
// whatever the token might be, it can be decoded back to the original payload

function decodeJwt(token) {
  try {
    // notice that decoding doesn't need the secret
    const decoded = jwt.decode(token)
    if (!decoded) {
      return false
    }
    return true
  } catch (error) {
    return false 
  }
}

// verifying a jwt token, here we will return true if the token is valid, and false if it is not valid
function verifyJwt(token) {
  try {
    jwt.verify(token, jwtPassword)
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
