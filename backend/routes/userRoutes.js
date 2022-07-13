//      @step-17b

const router = require('express').Router();

const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserData,
} = require('../controllers/userController');

//    @step-23
const { auth } = require('../middleware/authMiddleware');

router.get('/', getAllUsers);
router.post('/', registerUser);
router.post('/login', loginUser);

//    @step-23a
router.get('/me', auth, getUserData);

module.exports = router;
