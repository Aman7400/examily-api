const router = require('express').Router();
const examRoutes = require('./exam');
const authRoutes = require('./auth');

// * Entry Point
router.get('/', (req, res) => {
  res.send('Welcome to Examily');
});

// * User Authentication
router.use('/auth', authRoutes);

// * Exam routes
router.use('/exams', examRoutes);

module.exports = router;
