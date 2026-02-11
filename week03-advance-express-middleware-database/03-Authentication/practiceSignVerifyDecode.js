//

const express = require('express')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

const app = express()
app.use(express.json())

const jwtPassword = 'secret'

app.get('/', (req, res) => {
  res.send('Hello there, GET is working')
})

// sign in
app.post('/signin', (req, res) => {
  // zod schema to validate the input
  const schema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
  })

  const result = schema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ msg: 'invalid input' })
  }

  // generating the token
  const token = jwt.sign(req.body, jwtPassword)
  res.json({ token })
})

// verify
app.post('/verify', (req, res) => {
  const { token } = req.body

  try {
    jwt.verify(token, jwtPassword)
    res.json({ valid: true })
  } catch {
    res.json({ valid: false })
  }
})

// decode
app.post('/decode', (req, res) => {
  const { token } = req.body

  const decoded = jwt.decode(token)
  if (!decoded) {
    return res.json({ msg: 'invalid token format' })
  }

  res.json({ decoded })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
