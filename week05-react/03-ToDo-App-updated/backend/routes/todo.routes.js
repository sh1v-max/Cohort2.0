const express = require('express')
const todoController = require('../controllers/todo.controller')
const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate')
const schemas = require('../zod/schemas')

const router = express.Router()

// protect all routes after this middleware
router.use(authMiddleware.protect)

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(validate(schemas.createTodoSchema), todoController.createTodo)

router
  .route('/:id')
  .put(validate(schemas.updateTodoSchema), todoController.updateTodo)
  .delete(todoController.deleteTodo)

module.exports = router
