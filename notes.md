# MERN set up MongoDB/Express/React/Node

## PART I

### `Should Knows`

- `Purpose`

  - These notes should guide the entire process of setting up a server with `Node` and `Express` and connecting it to a `MongoDB database` using `Mongoose`

- `How to Search`

  - To find a specific step search for '@step-#` replacing # with step number

- `Dependencies`

  - `npm i express bcryptjs dotenv express-async-handler jsonwebtoken mongoose`

- `Dev Deps`

  - `npm i -D nodemon`

- `Optional Deps`
  - `npm i colors`

---

### `@step-1`

- `npm init` & `package.json` & `.gitignore`

  - Run `npm init` - yes to all Q's

  - Install all dependencies

  - Set up the gitignore

```.env
#.env

node_modules
.env
```

- Create `start` and `server` scripts to run server.js

```js
// package.json

"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
  },
```

- Create server.js - path: `/backend/server.js`
- Set up required imports
- Call the server from express
- Set up middleware to use json and urlencoded
- Create a basic route to '/' or whatever you see fit
- Make the server listen
- Run the server and view the output

```js
// server.js

require('dotenv').config();
const express = require('express');
require('colors');

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin', (req, res) =>
  res.status(200).json({ message: 'Shits runnin dude' })
);

app.listen(port, () =>
  console.log(`Server running on port ${port}`.underline.blue)
);
```

---

### `@step-2`

- Set up .env file on the root
  - Create all of the required vars (MONGO_URI will be added after we create the DB)

```env
// .env

NODE_ENV=development
PORT=6000
MONGO_URI=
JWT_SECRET=abc123
```

---

### `@step-3`

- Crete routes directory and build first routes file 'goalRoutes.js' -> `/backend/routes/goalRoutes.js`
- Declare router from express.Router()
- Create routes for specific endpoints
- Export router

```
// goalRoutes.js

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Success from the GET' });
});

module.exports = router;
```

---

### `@step-4`

- Within `server.js` update the route '/api/goals' to use the goalsRouter

```js
// server.js

app.use('/api/goals', require('./routes/goalRoutes'));
```

---

### `@step-5`

- Create `goalController.js` within `/backend/controllers/goalController.js`
- Import the async handler
- Build a function to handle the async data call to the db
- Export all of the fns

```js
// goalController.js

const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Success from the goal controller' });
});

module.exports = {
  getGoals,
};
```

---

### `@step-6`

- Import the controller

### `step-6a`

- Replace the callback in the route with the controller

```js
// goalRoutes.js

const { getGoals } = require('../controllers/goalController');

router.get('/', getGoals);
```

---

### `@step-7`

- Go to mongodb and create a cluster/db/collection
- Connect mongodb db with compass to view data

---

### `@step-8`

- Connect your application by grabbing the URI and setting it to our MONGO_URI env var

```env
# .env

MONGO_URI=mongodb+srv://zaar:zaar@mern-3.iwodxet.mongodb.net/mern-3?retryWrites=true&w=majority
```

---

### `@step-9`

- Connection time
- Create `/backend/config/db.js`
- Connect DB with mongoose

```js
// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected: ${conn.connection.host}`.underline.green);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### `@step-10`

- Import connectDb function from db.js
- Immediately call the `connectDB()` function

```js
// server.js

const connectDB = require('./config/db');
connectDB();
```

---

### `@step-11`

- Create a model for the goals
- Create `/backend/model/goalModel.js`
- Define Schema for the model with mongoose - i.e. content of the items in the table

```js
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
```

---

### `@step-12`

- Import our goal model that helps us interact with the db

### `@step-12a`

- Call our goal model with a method from mongoose `.find()` which returns all records in the selected table - i.e. `Goal`

```js
// goalController.js

const Goal = require('../model/goalModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
```

---

---

---

## PART II

- `What we have so far`

  - We now have an `Express server` talking to a `MongoDB database` using `Mongoose`
  - This server is only using a single method - GET all goals

- `What's next`
  - Error handling
  - Add the rest of the CRUD opperations, C, U and D

---

### `@step-13`

- Create `/backend/middleware/errorMiddleware.js`

```js
// errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
```

---

### `@step-14`

- Use the error middlware in `server.js`

```js
// server.js

const { errorHandler } = require('./middleware/errorMiddleware');

app.use(errorHandler);
```

### `@step-15`

- CREATE
- Head to `goalController.js` and create the C, U and D functionality

```js
// goalController.js

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text value when submitting a new goal');
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    req.status(400);
    throw new Error('Cannot find goal to update');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Cannot find goal to delete');
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json(deleteGoal);
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
```

### `@step-16`

- import all of the controllers within `goalRoutes.js`

### `@step-16a`

- Use the controllers with the routes

```js
// goalRoutes.js

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
```

---

---

---

## PART III

- `What we have so far`

  - A `fullly working CRUD server` that `shows`, `creates`, `updates`, and `deletes` goals

- `What's next'
  - `Users` and `authentication` using `JWT` and `bcrypt.js`

### `@step-17 - User Model and Routes`

- Set up User `routes`, `controllers` and `model` and allow the server to use `userRoutes`

### `@step-17a`

- Allow server to use `userRoutes`

```js
// server.js

app.use('/api/users', require('./routes/userRoutes'));
```

### `@step-17b`

- Create `userRoutes.js`

```js
// userRoutes.js

const router = require('express').Router();

const {
  registerUser,
  loginUser,
  getUserData,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', getUserData);

module.exports = router;
```

### `@step-17c`

- Create `userController.js`

```js
// userController.js

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'register user from userController.js' });
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'register user from userController.js' });
});

const getUserData = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'register user from userController.js' });
});

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
```

### `@step-17d`

- Create `userModel.js`

```js
// userModel.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
```

### `@step-18 - Connecting the two tables Users and Goals`

- Head to `goalModel.js` and add a table reference

```js
// goalModel.js (within the goal schema)

user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
```

### `@step-19 - Generate token function`

- Create our generate token function within `userController.js` using `jsonwebtoken`

```js
// userController.js

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
```

### `@step-20 - Password encryption`

- At `userController.js` we will work within `registerUser` to encrypt our submitted password

```js
// userController.js

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('🚫 Please ensure all fields are filled out');
  }

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  if (usernameExists || emailExists) {
    res.status(400);
    throw new Error('🚫 A user with that username or email exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error('🚫 Invalid user data');
  }

  res.status(201).json({
    username: user.username,
    email: user.email,
    _id: user.id,
    token: generateToken(user._id),
  });
});
```

### `@step-21 - Log in and check password logic`

- Add the logic within `loginUser` at `userController.js`

```js
// userController.js

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please provide username and password to log in');
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});
```

### `@step-22 - Authentication middleware`

- Create `authMiddleware.js` within `/backend/middleware/authMiddleware.js` and add the authentication middleware function

```js
// authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('No Auth');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token to authenticate');
  }
});

module.exports = {
  auth,
};
```

### `@step-23 - Protect the user data with auth middleware`

- Import our auth middleware into `userRoutes.js`

### `@step-23a - Use auth middleware on user data route`

- Use middleware on route within `userController.js`

```js
// userController.js

const { auth } = require('../middleware/authMiddleware');

router.get('/me', auth, getUserData);
```

### `@step-24 - CREATE - Authenticate createGoal route`

- Import auth middleware and use it on the createGoal route within `goalRoutes.js`

```js
// goalController.js

const { auth } = require('../middleware/authMiddleware');

router.post('/', auth, createGoal);
```

### `@step-24a - CREATE -Create goal with the authenticated user and assign the users id to the created goal`

- Add logic to createGoal to assign a user id to the created goal
  - The ID should be the id of the user who submitted
  - This id information is stored within the token which is recieved during log in

```js
// goalController.js

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text value when submitting a new goal');
  }

  //    @step-24a
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});
```

### `@step-25 - GET - Authenticate getGoals route`

- Within `goalController.js` getGoals needs to find the goals associated with the same user
  - This can be achieved by searching through the Goals document for any goals that have the same user id as the id making the request
  - This can be achieved by using the id on the user object tied to the req header (which we assigned during authentication)

```js
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
```

### `@step-26 - PUT - Authenticate updateGoals route`

- Import `User` model into `goalController.js`
- Find the user with the User model by passing the user id from the headers
- Check the retrieved user's ID against the user id assosiated with the goal. Under the name 'user' on the goal (should be 'user_id' in future)
- If all validation passes then it runs the original find by id and update method

```js
// goalController.js

const User = require('../model/userModel');

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    req.status(400);
    throw new Error('Cannot find goal to update');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});
```

### `@step-27 - DELETE - Authenticate deleteGoals route`

- Similar to the update functionality

```js
// goalController.js

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Cannot find goal to delete');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedGoal);
});
```

### `@step-28 - Authenticate getUserData route`

```js
const getUserData = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});
```
