const { signJwt, verifyJwt, decodeJwt } = require('./practiceSignVerifyDecode')

const token = signJwt('john@deo.com', '123456')

console.log('Generated Token:', token)

if (token) {
  console.log('Is token valid?', verifyJwt(token))
  console.log('Decoded payload:', decodeJwt(token))
}
