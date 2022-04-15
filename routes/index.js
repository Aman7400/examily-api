const router = require('express').Router();
const examRoutes = require('./exam');
const authRoutes = require('./auth');
const { verifyUser } = require('../middlewares/verifyUser');

// * Entry Point
router.get('/', (req, res) => {
  res.send('Welcome to Examily');
});

// * User Routes
router.use('/auth', authRoutes);

// * Verfiy User
router.use(verifyUser);

// * Exam routes
router.use('/exams', examRoutes);

module.exports = router;
