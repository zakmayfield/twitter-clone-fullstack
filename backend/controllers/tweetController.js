//      @step-5      create goal controller file to hold all of the functions and DB interactions

const asyncHandler = require('express-async-handler');

//      @step-12    import our goalModel we created in step 11 & use the asyncronous Goal model
const Tweet = require('../model/tweetModel');

const getTweets = asyncHandler(async (req, res) => {
  //    @step-12a use our Goal model here to call a mongoose method of 'find()' that returns all
  //    @step-25 find all posts by user id
  const tweets = await Tweet.find({ user: req.user.id });
  res.status(200).json(tweets);
});

//    @step-15    adding the rest of the CRUD opperations with validation logic
const createTweet = asyncHandler(async (req, res) => {
  if (!req.body.tweetBody) {
    res.status(400);
    throw new Error('Please add a value');
  }

  //    @step-24a
  const tweet = await Tweet.create({
    tweetBody: req.body.tweetBody,
    user: req.user.id,
  });

  res.status(200).json(tweet);
});

const updateTweet = asyncHandler(async (req, res) => {
  //    @step-26    authentication
  const tweet = await Tweet.findById(req.params.id);

  if (!tweet) {
    req.status(400);
    throw new Error('Cannot find tweet to update');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (tweet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTweet);
});

const deleteTweet = asyncHandler(async (req, res) => {
  //    @step-27    authentication

  const tweet = await Tweet.findById(req.params.id);

  if (!tweet) {
    res.status(400);
    throw new Error('Cannot find tweet to delete');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (tweet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const deletedTweet = await Tweet.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedTweet);
});

module.exports = {
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
};
