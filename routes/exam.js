const {
  postCreateNewExam,
  getAllExams,
  postTakeExam,
  getAExam,
} = require('../controllers/exams');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Get started with Examily, ${req.user.firstName}`);
});

router.post('/create', postCreateNewExam);

router.get('/all', getAllExams);

router.get('/:examId', getAExam);

router.post('/test', postTakeExam);

module.exports = router;
