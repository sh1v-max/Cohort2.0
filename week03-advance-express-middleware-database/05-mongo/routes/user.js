const { Router } = require('express')
const userMiddleware = require('../middleware/user')
const { User, Course } = require('../db')

const router = Router()

// User Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  try {
    await User.create({ username, password })
    res.json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message })
  }
})

router.get('/courses', userMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ published: true })
    res.json({ courses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: err.message })
  }
})

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const courseId = req.params.courseId
  const user = req.user

  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already purchased' })
    }
    await user.save()
    res.json({ message: 'Course purchased successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error purchasing course', error: err.message })
  }
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('purchasedCourses')
    res.json({ purchasedCourses: user.purchasedCourses })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching purchased courses', error: err.message })
  }
})

module.exports = router
