// this creates a simple RESTful API for managing a todo list using Node.js and Express

// 1. GET /todos - Returns a list of todos
// 2. GET /todos/:id - Returns a single todo by ID
// 3. POST /todos - Creates a new todo
// 4. PUT /todos/:id - Updates a todo by ID
// 5. DELETE /todos/:id - Deletes a todo by ID

// all data is stored in a local JSON file named todos.json
// it's called "file based persistence storage"

const express = require('express')
// node cannot read json body by default, we need body-parser middleware
// it converts request body into usable json object
const bodyParser = require('body-parser')
// file system module to read and write files
const fs = require('fs')

const app = express()
// use body-parser middleware to parse json body
// it parse json and attach it to req.body
// without this, req.body === undefined
app.use(bodyParser.json())

// helper function to find index of todo by id
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i
  }
  return -1
}

// helper function to remove item at index from array
function removeAtIndex(arr, index) {
  let newArray = []
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i])
  }
  return newArray
}

// define routes
// root route to show api status
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Todo API is running, interact using Postman or curl.',
    endpoints: {
      getAll: 'GET /todos',
      getOne: 'GET /todos/:id',
      create: 'POST /todos',
      update: 'PUT /todos/:id',
      delete: 'DELETE /todos/:id',
    },
  })
})

// CRUD routes for todos
// shows all todos
app.get('/todos', (req, res) => {
  fs.readFile('todos.json', 'utf8', function (err, data) {
    if (err) throw err
    res.json(JSON.parse(data))
  })
})

// shows single todo by id
app.get('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', function (err, data) {
    if (err) throw err
    // data is not js array yet, it's string
    const todos = JSON.parse(data)
    // extract id from req.params.id, it is string, convert to int
    const todoIndex = findIndex(todos, parseInt(req.params.id))
    // findIndex returns 1 if found, -1 if not found
    if (todoIndex === -1) {
      res.status(404).send()
    } else {
      // return the found todo
      res.json(todos[todoIndex])
    }
  })
})

// creates new todo
app.post('/todos', function (req, res) {
  const newTodo = {
    // unique random id
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description,
  }
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err
    const todos = JSON.parse(data)
    todos.push(newTodo)
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
      if (err) throw err
      res.status(201).json(newTodo)
    })
  })
})

app.put('/todos/:id', function (req, res) {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err
    const todos = JSON.parse(data)
    const todoIndex = findIndex(todos, parseInt(req.params.id))
    if (todoIndex === -1) {
      res.status(404).send()
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description,
      }
      todos[todoIndex] = updatedTodo
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err
        res.status(200).json(updatedTodo)
      })
    }
  })
})

app.delete('/todos/:id', function (req, res) {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err
    let todos = JSON.parse(data)
    const todoIndex = findIndex(todos, parseInt(req.params.id))
    if (todoIndex === -1) {
      res.status(404).send()
    } else {
      todos = removeAtIndex(todos, todoIndex)
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err
        res.status(200).send()
      })
    }
  })
})

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send()
})

module.exports = app
