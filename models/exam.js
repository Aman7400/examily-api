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
    description: { type: 'string' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    questions: {
      required: true,
      type: [questionSchema],
    },
    status: {
      type: 'string',
    },
    passPercent: {
      type: 'number',
    },
    startsOn: {
      type: 'string',
      required: true,
    },
    endsOn: {
      type: 'string',
      required: true,
    },
    answerKey: {
      type: 'array',
    },
    attemptedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model('Exams', examSchema);

// * Generate Answer Key
// examSchema.pre('save', function (next) {
//   console.log(
//     'ak',
//     this.questions.map((question) => question.correctAnswer)
//   );
//   this.answerKey = this.questions.map((question) => question.correctAnswer);
//   next();
// });

module.exports = { Exam };
