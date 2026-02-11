const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

const { z } = require('zod');

function signJwt(username, password) {
    const schema = z.object({
        username: z.string().email(),
        password: z.string().min(6),
    })
    const payload = {
        username,
        password
    }
    let result = schema.safeParse(payload)
    if (!result.success) {
        return null
    }else{
        return jwt.sign(payload, jwtPassword)
    }

}

function verifyJwt(token) {
    // Your code here
    try {
        jwt.verify(token, jwtPassword)
        return true;
    } catch (error) {
        return false
    }
}

function decodeJwt(token) {
    // Your code here
    try {
        const decoded = jwt.decode(token)
        if (!decoded) {
            return false
        }
        return true;
    } catch (error) {
        return false
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
