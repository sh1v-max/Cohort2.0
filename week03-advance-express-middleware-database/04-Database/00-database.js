// we're making a crud database application with express and mongoose

const mongoose = require('mongoose')
// connecting to the database, we need to provide the connection string to connect to the database, we can get it from the mongodb atlas dashboard
mongoose.connect(
  'mongodb+srv://backendUser:dl7kp6rbAMbJTIe0@backend-cluster.t4dc0yg.mongodb.net/user_app',
)
// express to create a server and handle routes
const express = require('express')
const app = express()
// we also need to use express.json() middleware to parse the json data from the request body
app.use(express.json())

// defining a user schema and model, the schema defines the structure of the data we want to store in the database
const User = mongoose.model('User', {
  // the model is used to interact with the database
  // model gives us methods like save, find, findOne, findOneAndUpdate, findOneAndDelete etc to perform CRUD operations on the database
  name: String,
  email: String,
  password: String,
})

app.get('/', function (req, res) {
  res.send('Git is working')
})

// creating signup route to create a new user, we will use the User model to save the user data to the database
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

// creating a route to get all users, we will use the User model to fetch all users from the database and return them in the response
app.get('/users', async function (req, res) {
  try {
    const users = await User.find().select('-password')
    //  excluding the password field from the response using select method of mongoose
    res.json(users)
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching users' })
  }
})

// creating a route to update a user, we will use the User model to find the user by email and update the name and password fields, we will return the updated user in the response
app.put('/update', async function (req, res) {
  const { email, newName, newPassword } = req.body

  // using try catch block to handle errors, if the user is not found we will return a 404 status code, if there is any other error we will return a 500 status code
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

// creating a route to delete a user, we will use the User model to find the user by email and delete it from the database
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

app.listen(3000, function () {
  console.log('Server is running on post 3000')
})
