const {
  postRegisterNewUser,
  postLoginUser,
  getUserProfile,
} = require('../controllers/auth');
const { verifyUser } = require('../middlewares/verifyUser');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Get started with Examily Auth');
});

// * Sign Up New User
router.post('/register', postRegisterNewUser);
// * Login New User
router.post('/login', postLoginUser);
// * Get User Profile
router.get('/profile', verifyUser, getUserProfile);

module.exports = router;
