const { postRegisterNewUser, postLoginUser } = require('../controllers/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Get started with Examily Auth');
});

// * Sign Up New User
router.post('/register', postRegisterNewUser);
// todo - add passport auth
router.post('/login', postLoginUser);

module.exports = router;
