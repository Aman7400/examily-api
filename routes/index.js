const router = require('express').Router();
const examRoutes = require('./exam');

// * Entry Point
router.get('/', (req, res) => {
  res.send('Welcome to Examily');
});

// * Exam routes
router.use('/exams', examRoutes);

module.exports = router;
