const { todo } = require('./db')
const { createTodo, updateTodo } = require('./types')

const express = require('express')
const app = express()
// make sure you install cors too, it is used for connecting frontend and backend
// without it, you won't be able to hit backend using your frontend
const cors = require('cors')

app.use(express.json())
app.use(cors())

// body{
//   title: "string",
//   description: "string"
// }

app.get('/', function(req, res){
  res.send('hello world')
})

app.post('/todo', async function (req, res) {
  try {
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: 'you send the wrong inputs',
      })
      return
    }
    // add the data in the database
    // await till todo is created
    const newTodo = await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      // why adding completed: false?
      // because when we create a todo, it is not completed by default
      completed: false,
    })
    res.json({
      msg: 'todo created',
      todo: newTodo,
    })
  } catch (error) {
    console.error('error creating todo:', error)
    res.status(500).json({
      msg: 'internal server error',
    })
  }
})

app.get('/todos', async function (req, res) {
  // we want all todos, so no condition needed
  // also we need to await it, or it will return a promise
  const todos = await todo.find({})
  // console.log(todo)
  res.json({
    todos: todos,
  })
})

app.put('/completed', async function (req, res) {
  const updatePayload = req.body
  const parsePayload = updateTodo.safeParse(updatePayload)
  if (!parsePayload.success) {
    res.status(411).json({
      msg: 'you send the wrong inputs',
    })
    return
  }

  // update specific todo, and mark it as completed
  await todo.updateOne(
    // which todo you want to update?
    {
      _id: req.body.id,
    },
    // what parameter of that todo do you want to update? 
    {
      completed: true,
    },
  )

  // acknowledge the user that the todo is marked as completed
  res.json({
    msg: 'todo mark as completed',
  })
})

app.listen(3000, function(){
  console.log('server is running on port 3000')
})
