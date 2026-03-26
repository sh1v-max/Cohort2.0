const mongoose = require('mongoose')
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI + 'course_selling_app2',
)

// Define schemas
// Define schema for admins
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

// Define schema for users, including a reference to courses they've purchased
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
})

// Define schema for courses including details and publish status
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: { type: Boolean, default: true },
})

// Compile schemas into models for database interaction
const Admin = mongoose.model('Admin', AdminSchema)
const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)

module.exports = {
  Admin,
  User,
  Course,
}
