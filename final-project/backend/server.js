import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise


const userSchema = new mongoose.Schema({
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
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  },
  // Array of tasks
  items: [{
    // id: { 
    //  type: Number }, 
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

const User = mongoose.model('User', userSchema) 

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') });
    if (user) {
      req.user = user
      next();
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

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
      userID: user._id,
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
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, errorMessage: 'User not found' })
    }
  } catch (error) {
  res.status(400).json({ success: false, errorMessage: 'Invalid request', error })
  }
})

app.get('/users/:id/my-trip', authenticateUser);
app.get('/users/:id/my-trip', async (req, res) => {
  res.json({ success: true })
})

app.post('/users/:id/checklist', async (req, res) => {
  try {
    const userId = req.params.id
    const { isComplete, description, createdAt } = req.body
    let user;
    try {
      user = await User.findById(userId)
    } catch(error) {
      throw "User not found"
    }
      user.items.push({ isComplete: isComplete, description: description, createdAt: createdAt})
      user.save()
      // const addedItems = user.items[user.items.length-1]
      res.status(200).json
    } catch(error) {
      res.status(404).json({ success: false, errorMessage: 'Could not add item', error })
    }
})

app.get("/users/:id/checklist", async (req, res) => {
  try {
    const userId = req.params.id
    // const { items } = req.params
    const { isComplete, description, createdAt } = req.body
    let user;
    try {
      user = await User.findById(userId) 
    } catch(error) {
        throw "User not found";
    }
    // const arrayOfItems = res.json.map(item)
    // res.status(200).json({ success: true, arrayOfItems})
    
    res.status(200).json({ isComplete: isComplete, description: description, createdAt: createdAt})
  } catch(error) {
    res.status(404).json({ success: false, errorMessage: 'Could not get items', error })
  }
});

//   res.json({ success: true, todos});
// });

/*app.post('/checklist', authenticateUser);
app.post('/checklist', async (req, res) => {
  const { items } = req.body

  try {
    const newTodo = await new Todo({ items }).save();
    res.json({ success: true, newTodo})
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
});*/

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
