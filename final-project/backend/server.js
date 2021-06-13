import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise


const User = mongoose.model( 'User',{
  username: {
    type: String,
    required: true,
    unique: true, 
    minlength: 4,
    maxlength: 20
  },
  password: {
    type: String, 
    requered: true,
    minlength: 4,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
// })
//   //Array of trips
//   const Trip = mongoose.model( 'Trip',{
  trip: [{
    destination: {
      type: String,
      required: true
    }, 
    // _id: {
    //   type: String,
    // },
    departure: {
      type: Date,
      requered: true
    }
    //YYYY-MM-DDThh:mmTZD, (eg 1997-07-16T19:20+01:00)
  }],
// })  
//   // Array of tasks
//   const Items = mongoose.model( 'Items',{
  items: [{ 
    description: { 
      type: String 
      },
    createdAt: { 
      type: Date, 
      default: Date.now }, 
    isComplete: { 
      type: Boolean, 
      default: false }
  }]
})

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', errors:err });
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const salt = bcrypt.genSaltSync()
    const user = await new User({
      username,
      password:bcrypt.hashSync(password,salt)
    }).save()
    res.json({
      success: true,
      userId: user._id,
      username: user.username,
      accessToken: user.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalig request', error })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
  res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})
// Post Trip
app.post('/users/:userId/trip', authenticateUser, async (req, res) => {
  try {
    const {userId} = req.params
    const { destination, departure } = req.body
    let user;
    try {
      user = await User.findOne({_id: userId})
    } catch(error) {
      throw "User not found"
    }
      user.trip.push({ 
        destination: destination, 
        departure: departure,
        })
      user.save()
      res.status(200).json({ success: true })
    } catch(error) {
      res.status(400).json({ success: false, message: 'Could not add trip', error })
    }
  })

// Get Trip
app.get('/users/:userId/trip', authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findOne({ _id: userId })

    res.status(200).json({ success: true, trip: user.trip })
  } catch {
    res.status(400).json({ success: false, message: 'Something went wrong, could not fetch trip',error })
  }
})

// POST Items
app.post('/users/:userId/checklist', authenticateUser, async (req, res) => {
  try {
    const {userId} = req.params
    const { isComplete, description, createdAt } = req.body
    let user;
    try {
      user = await User.findOne({ _id: userId })
    } catch(error) {
      throw "User not found"
    }
      user.items.push({ 
        isComplete: isComplete, 
        description: description, 
        createdAt: createdAt})
      user.save()
      res.status(200).json({ success: true })
    } catch(error) {
      res.status(400).json({ success: false, message: 'Could not add item', error })
    }
})

// GET Items
app.get('/users/:userId/checklist', authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findOne({ _id: userId })

    res.status(200).json({ success: true, items: user.items })
  } catch {
    res.status(400).json({ success: false, message: 'Something went wrong, could not fetch checklist', error })
  }
})
  

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
