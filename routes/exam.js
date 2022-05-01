const {
  postCreateNewExam,
  getAllExams,
  postTakeExam,
  getAExam,
  getAllAvailableExams,
} = require('../controllers/exams');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Get started with Examily, ${req.user.firstName}`);
});

// ? ---- Student Exams Routes

// * take a exam by student
router.post('/test', postTakeExam);
// * get all available exam for a student
router.get('/available', getAllAvailableExams);

// ? ---- Examiner Exams Routes

// *  create a exam
router.post('/create', postCreateNewExam);

// * get all exams created by a Examiner
router.get('/all', getAllExams);

// * get a exam created by a Examiner
router.get('/:examId', getAExam);

module.exports = router;
