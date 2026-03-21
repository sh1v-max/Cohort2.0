const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

//Hardcoded TODOS
const todos = [
  {
    id: 1,
    title: 'Todo 1',
    description: 'This is todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    description: 'This is todo 2',
    completed: false,
  },
  {
    id: 3,
    title: 'Todo 3',
    description: 'This is todo 3',
    completed: false,
  },
  {
    id: 4,
    title: 'Todo 4',
    description: 'This is todo 4',
    completed: false,
  },
  {
    id: 5,
    title: 'Todo 5',
    description: 'This is todo 5',
    completed: false,
  },
]

app.get('/', (req, res) => {
  res.send('server is running')
})

app.get('/todos', (req, res) => {
  const randomTodos = []
  for (let i = 0; i < 5; i++) {
    if (Math.random() > 0.5) {
      randomTodos.push(todos[i])
    }
  }
  res.json({
    todos: randomTodos,
  })
  // res.json({ todos })
})

// update todo as done
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const todo = todos.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }

  res.json({ message: 'Updated' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
