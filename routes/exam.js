const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Get started with Exams');
});

module.exports = router;
