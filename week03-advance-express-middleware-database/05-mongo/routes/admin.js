const { Router } = require('express')
const adminMiddleware = require('../middleware/admin')
const { Admin, Course } = require('../db')

const router = Router()

// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username })
  if (existingAdmin) {
    return res.status(400).json({ message: 'admin already exists' })
  }

  try {
    await Admin.create({ username, password })
    res.json({ message: 'Admin created successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating admin', error: err.message })
  }
})

router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body

  try {
    const newCourse = await Course.create({
      title,
      description,
      price,
      imageLink,
    })
    res.json({
      message: 'Course created successfully',
      courseId: newCourse._id,
    })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating course', error: err.message })
  }
})

router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({})
    res.json({ courses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: err.message })
  }
})

module.exports = router
