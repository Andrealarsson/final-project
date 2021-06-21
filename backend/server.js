import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { time } from "console";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  trip: [
    {
      destination: {
        type: String,
      },
      departure: {
        type: Date,
      },
      //YYYY-MM-DDThh:mmTZD, (eg 1997-07-16T19:20+01:00)
    },
  ],
  items: [
    {
      description: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      req.user=user
      next();
    } else {
      res.status(401).json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid request", errors: err });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.json({
      success: true,
      userId: user._id,
      username: user.username,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalig request", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken,
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
});

// Post Trip
app.post("/users/trip", authenticateUser, async (req, res) => {
  try {
    const { trip, departure} = req.body;
    console.log(req.body)
    req.user.trip.push({
      destination: trip,
      departure: departure,
    });
    req.user.save();
    res.status(200).json({ success: true, trip: req.user.trip });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Could not add trip", error });
  }
});

// Get Trip
app.get("/users/trip", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ success: true, trip: req.user.trip });
  } catch {
    res
      .status(400)
      .json({
        success: false,
        message: "Something went wrong, could not fetch trip",
        error,
      });
  }
});

//DELETE Trip
app.delete("/users/trip/:tripId", authenticateUser, async (req, res) => {
  const { tripId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { trip: { _id: tripId } } },
      { new: true }
    );
    res.status(200).json({ trip: req.user.trip, success: true });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid request", error });
  }
  }
);

// POST Items
app.post("/users/checklist", authenticateUser, async (req, res) => {
  try {
    const { items } = req.body;
    console.log(req.body)
    req.user.items.push({
      isComplete: false,
      description: items,
      createdAt: new Date(),
    });
    req.user.save();
    res.status(200).json({ success: true, items: req.user.items});
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Could not add item", error });
  }
});

// GET Items
app.get("/users/checklist", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ success: true, items: req.user.items });
  } catch {
    res
      .status(400)
      .json({
        success: false,
        message: "Something went wrong, could not fetch checklist",
        error,
      });
  }
});

// PATCH Items
app.patch("/users/checklist/:todoId", authenticateUser, async (req, res) => {
  const { todoId } = req.params
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { items: { _id: todoId } } }, { new: true })
    res.status(200).json({ Items: user.items, success: true });
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})


//DELETE Items
app.delete("/users/checklist/:todoId", authenticateUser, async (req, res) => {
  const { todoId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { items: { _id: todoId } } },
      { new: true }
    );
    res.status(200).json({ Items: user.items, success: true });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid request", error });
  }
  }
);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
