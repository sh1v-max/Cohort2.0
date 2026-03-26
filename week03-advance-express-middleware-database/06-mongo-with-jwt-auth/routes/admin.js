const { Router } = require('express')
const adminMiddleware = require('../middleware/admin')
const { Admin, Course } = require('../db')

const router = Router()

// Admin Routes
// Route to handle admin registration
router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // Check if an admin with the same username already exists in the database
  const existingAdmin = await Admin.findOne({ username })
  if (existingAdmin) {
    return res.status(400).json({ message: 'admin already exists' })
  }

  try {
    // Create new admin entry in the database
    await Admin.create({ username, password })
    res.json({ message: 'Admin created successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating admin', error: err.message })
  }
})

router.post('/signin', (req, res) => {
  // Implement admin signup logic
})

// Route for admins to create new courses
router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body

  try {
    // Insert a new course document into the database
    const newCourse = await Course.create({
      title,
      description,
      price,
      imageLink,
    })
    res.json({
      message: 'Course created successfully',
      // this is how we access id of the created course
      courseId: newCourse._id,
    })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating course', error: err.message })
  }
})

// Route for admins to retrieve all courses
router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    // Fetch all courses from the DB without filters
    const courses = await Course.find({})
    res.json({ courses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: err.message })
  }
})

module.exports = router
