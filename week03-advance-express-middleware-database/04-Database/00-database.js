const mongoose = require('mongoose')
mongoose.connect(
  'mongodb+srv://backendUser:dl7kp6rbAMbJTIe0@backend-cluster.t4dc0yg.mongodb.net/user_app',
)

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
})

app.post('/signup', async function (req, res) {
  const name = req.body.name
  const username = req.body.username
  const password = req.body.password

  const existingUser = await User.findOne({ email: username })
  // CRUD operations are async, so we need to await them
  // create, read, update, delete
  if (existingUser) {
    return res.status(400).send('User Already Exist')
  }

  const user = new User({
    name: name,
    email: username,
    password: password,
  })

  user.save().then(() => console.log('user backend is running'))
  res.json({
    msg: 'user created successfully',
  })
})

app.get('/users', async function (req, res) {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching users' })
  }
})

app.put('/update', async function (req, res) {
  const { email, newName, newPassword } = req.body

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name: newName, password: newPassword },
      { new: true },
    )

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    res.json({
      msg: 'User updated successfully',
      user: updatedUser,
    })
  } catch (err) {
    res.status(500).json({ msg: 'Update failed' })
  }
})

app.delete('/delete', async function (req, res) {
  const { email } = req.body

  try {
    const deletedUser = await User.findOneAndDelete({ email })

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    res.json({ msg: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed' })
  }
})
