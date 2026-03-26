const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const userMiddleware = require('../middleware/user')
const { User, Course } = require('../db')

const router = Router()

// User Routes
// Route to handle new user registration
router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // Check if the user is already registered in the DB
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  try {
    // Create new user entry in the database
    await User.create({ username, password })
    res.json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message })
  }
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username, password })
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET)
    res.json({ token })
  } else {
    res.status(411).json({ message: 'Incorrect username or password' })
  }
})

// Route for users to explore all published courses
router.get('/courses', userMiddleware, async (req, res) => {
  try {
    // Query DB for courses that are marked as published
    const courses = await Course.find({ published: true })
    res.json({ courses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: err.message })
  }
})

// Route for users to purchase a specific course
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const courseId = req.params.courseId
  const user = req.user

  try {
    // Verify if the course exists before processing the purchase
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Check if the user has already bought this course to avoid duplicates
    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already purchased' })
    }

    // Add the course id to the user's purchased courses array (Fixed missing push logic)
    user.purchasedCourses.push(courseId)
    // Save the updated user document to the DB
    await user.save()
    res.json({ message: 'Course purchased successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error purchasing course', error: err.message })
  }
})

// Route for users to see a list of courses they own
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    // Find the user by ID and populate their purchased courses array with full course data
    const user = await User.findById(req.user._id).populate('purchasedCourses')
    res.json({ purchasedCourses: user.purchasedCourses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching purchased courses', error: err.message })
  }
})

module.exports = router
