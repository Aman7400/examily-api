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

    // * Validations
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Exam Name is required',
      }),
      expireIn: Joi.number().required().messages({
        'any.required': 'Exam Expiry is required',
      }),
      status: Joi.string().required().messages({
        'any.required': 'Exam Status is required',
      }),
      questions: Joi.array()
        .required()
        .min(1)
        .items(
          Joi.object({
            title: Joi.string().required().messages({
              'any.required': 'Question Title is required',
            }),
            correctAnswer: Joi.number().required().messages({
              'any.required': 'Correct Answer is required',
            }),
            options: Joi.array()
              .length(4)
              .items(
                Joi.string().messages({
                  'string.base': 'All Options must be a string',
                })
              )
              .messages({
                'array.length': 'Only 4 options allowed',
              }),
          })
        )
        .messages({
          'any.required': 'Exam Questions are required',
          'array.min': 'min 1 question is required',
        }),
    });

    const { error } = schema.validate({
      ...examObject,
    });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    //  * Generate Exam Key
    const answerKey = examObject.questions.map(
      (question) => question.correctAnswer
    );

    //  * Create a new exam

    const newExam = new Exam({
      ...examObject,
      createdBy: req.user._id,
      answerKey,
    });
    await newExam.save();
    res.json({ message: 'Exam created successfully', exam: newExam._id });
  } catch (error) {
    console.log(error);
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
