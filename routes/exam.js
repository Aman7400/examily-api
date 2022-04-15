const { postCreateNewExam, getAllExams } = require('../controllers/exams');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Get started with Examily, ${req.user.firstName}`);
});

router.post('/create', postCreateNewExam);

router.get('/all', getAllExams);

module.exports = router;
