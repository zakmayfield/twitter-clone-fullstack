//      @step-17c

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  //    @step-20

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

const loginUser = asyncHandler(async (req, res) => {
  //      @step-21
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

const getUserData = asyncHandler(async (req, res) => {
  //    @step-28    authenticate
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

//      @step-19 - generate token using JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserData,
};
