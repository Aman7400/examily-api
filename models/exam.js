const mongoose = require('mongoose');

// * Questions Schema
const questionSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: true,
  },
  options: {
    type: 'array',
    required: true,
  },
  correctAnswer: {
    type: 'number',
    required: true,
  },
});

// * Exam Schema
const examSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: {
      required: true,
      type: [questionSchema],
    },
    status: {
      required: true,
      type: 'string',
    },
    passPercent: {
      type: 'number',
    },
    expireIn: {
      type: 'number',
    },
    answerKey: {
      type: 'array',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Exams', examSchema);
