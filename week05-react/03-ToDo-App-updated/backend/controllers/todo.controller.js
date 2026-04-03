const Todo = require('../models/Todo')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')

exports.createTodo = asyncHandler(async (req, res, next) => {
  const newTodo = await Todo.create({
    ...req.body,
    user: req.user.id,
  })

  res.status(201).json({
    status: 'success',
    data: { todo: newTodo },
  })
})

exports.getAllTodos = asyncHandler(async (req, res, next) => {
  // pagination setup
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const skip = (page - 1) * limit

  // query database
  const todos = await Todo.find({ user: req.user.id })
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)

  // total documents matching the user for pagination info
  const total = await Todo.countDocuments({ user: req.user.id })

  res.status(200).json({
    status: 'success',
    results: todos.length,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: { todos },
  })
})

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true, runValidators: true },
  )

  if (!todo) {
    return next(new AppError('No todo found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: { todo },
  })
})

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  })

  if (!todo) {
    return next(new AppError('No todo found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
