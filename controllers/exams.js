const { User } = require('../models/user');
const { Exam } = require('../models/exam');
const Joi = require('joi');

const postCreateNewExam = async (req, res, next) => {
  try {
    //   * if user is student, return
    if (req.user.userType === 'Student') {
      res.status(401);
      throw new Error('Unauthorized');
    }
    const { examObject } = req.body;
    //   * Validations
    //   TODO Validations
    //   * Create a new exam
    const answerKey = examObject.questions.map(
      (question) => question.correctAnswer
    );
    const newExam = new Exam({
      ...examObject,
      createdBy: req.user._id,
      answerKey,
    });
    await newExam.save();
    res.json({ message: 'Exam created successfully', exam: newExam._id });
  } catch (error) {
    next(error);
  }
};

const postTakeExam = async (req, res, next) => {
  try {
    //   * if user is examiner, return
    if (req.user.userType === 'Examiner') {
      res.status(401);
      throw new Error('Unauthorized');
    }
    const { attemptedExamDetails } = req.body;
    const { answers, examId } = attemptedExamDetails;
    let marks = 0;
    const { answerKey } = await Exam.findById(examId).select('answerKey');
    console.log({ answers }, { answerKey });
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == answerKey[i]) {
        marks += 1;
      }
    }
    //   *  Add Exam to User Profile, Add User to ExamStats.TotalStudentAttmepted
    res.json({ messages: 'Result', marks });
  } catch (error) {
    next(error);
  }
};

const getAllExams = async (req, res, next) => {
  try {
    const allExams = await Exam.find({ createdBy: req.user._id }).populate(
      'createdBy',
      ['_id', 'firstName', 'lastName', 'email']
    );

    res.json({ message: 'All Exams', exams: allExams });
  } catch (error) {
    next(error);
  }
};

module.exports = { postCreateNewExam, getAllExams, postTakeExam };
