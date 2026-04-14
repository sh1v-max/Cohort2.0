const express = require('express')
const authController = require('../controllers/auth.controller')
const validate = require('../middleware/validate')
const schemas = require('../zod/schemas')

const router = express.Router()

router.post('/signup', validate(schemas.signupSchema), authController.signup)
router.post('/login', validate(schemas.loginSchema), authController.login)

module.exports = router
