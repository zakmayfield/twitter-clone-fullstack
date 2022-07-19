//      @step-3      create the routes for each endpoint - more will be added to this file when we create our connectors

//      declare router with express import
const router = require('express').Router();

//      @step-6     import the getGoals controller and it with respecitve function
//      @step-16    import the rest of the created controllers and use as needed
const {
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} = require('../controllers/tweetController');

const { auth } = require('../middleware/authMiddleware');

//      create routes for specific endpoints
//      @step-6a    replace the callback with the controller that handles this i.e. getGoals
//      @step-16a   replace callbacks with the controller functions i.e. createGoal, updateGoal, deleteGoal
router.get('/', auth, getTweets);
router.post('/', auth, createTweet);
router.put('/:id', auth, updateTweet);
router.delete('/:id', auth, deleteTweet);

module.exports = router;
