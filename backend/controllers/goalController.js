//      @step-5      create goal controller file to hold all of the functions and DB interactions

const asyncHandler = require('express-async-handler');

//      @step-12    import our goalModel we created in step 11 & use the asyncronous Goal model
const Goal = require('../model/goalModel');
const User = require('../model/userModel');

const getGoals = asyncHandler(async (req, res) => {
  //    @step-12a use our Goal model here to call a mongoose method of 'find()' that returns all
  //    @step-25 find all posts by user id
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//    @step-15    adding the rest of the CRUD opperations with validation logic
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

const updateGoal = asyncHandler(async (req, res) => {
  //    @step-26    authentication
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    req.status(400);
    throw new Error('Cannot find goal to update');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  //    @step-27    authentication

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Cannot find goal to delete');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
