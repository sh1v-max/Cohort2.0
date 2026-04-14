// schema structure
// Todo{
//   title: string,
//   description: string,
//   completed: boolean
// }

const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`${process.env.MONGO_URI}todos`)

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const todo = mongoose.model('todo', todoSchema)

module.exports = {
  todo: todo,
}
