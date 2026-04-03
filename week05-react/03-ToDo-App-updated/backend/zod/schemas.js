const { z } = require('zod')

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

const updateTodoSchema = z.object({
  completed: z.boolean().optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
})

module.exports = {
  signupSchema,
  loginSchema,
  createTodoSchema,
  updateTodoSchema,
}
