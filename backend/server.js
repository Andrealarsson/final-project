import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

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
    res.status(400).json({ success: false, message: "Invalid request", errors: err });
  }
};

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

// POST Trip
app.post("/users/trip", authenticateUser, async (req, res) => {
  try {
    const { trip, departure} = req.body;
    req.user.trip.push({
      destination: trip,
      departure: departure,
    });
    req.user.save();
    res.status(200).json({ success: true, trip: req.user.trip.slice()
    .sort((b, a) => new Date(b.departure) - new Date(a.departure))})
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not add trip", error });
  }
});

// GET Trip
app.get("/users/trip", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ success: true, trip: req.user.trip.slice()
      .sort((b, a) => new Date(b.departure) - new Date(a.departure))});
  } catch {
    res.status(400).json({success: false, message: "Could not fetch trip", error,});
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
    res.status(200).json({ success: true, trip: user.trip.slice()
    .sort((b, a) => new Date(b.departure) - new Date(a.departure))});
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
  }
);

// POST Items
app.post("/users/checklist", authenticateUser, async (req, res) => {
  try {
    const { items } = req.body;
    req.user.items.push({
      isComplete: false,
      description: items,
      createdAt: new Date(),
    });
    req.user.save();
    res.status(200).json({ success: true, items: req.user.items});
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not add item", error });
  }
});

// GET Items
app.get("/users/checklist", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ success: true, items: req.user.items });
  } catch {
    res.status(400).json({ success: false, message: "Could not fetch checklist", error });
  }
});

// PATCH Items
app.patch("/users/checklist/:todoId", authenticateUser, async (req, res) => {
  const { todoId } = req.params
  const { isComplete } = req.body
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.user._id, items: {$elemMatch: {_id: todoId}}},
      {$set: {'items.$.isComplete': isComplete}},
      {new: true}
    );
    res.status(200).json({ items: user.items, success: true });
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
    res.status(200).json({ items: user.items, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
  }
);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
