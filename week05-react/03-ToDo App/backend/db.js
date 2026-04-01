// schema structure
// Todo{
//   title: string,
//   description: string,
//   completed: boolean
// }

const mongoose = require('mongoose')

// put link in .env file
// mongodb+srv://singhshiv0427_db_user:5r8wNtjnJc95RrHE@cluster0.farurxz.mongodb.net/
mongoose.connect(
  'mongodb+srv://singhshiv0427_db_user:5r8wNtjnJc95RrHE@cluster0.farurxz.mongodb.net/todos',
)

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const todo = mongoose.model('todo', todoSchema)

module.exports = {
  todo: todo,
}