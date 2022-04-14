const mongoose = require('mongoose');

// * User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'array',
      required: true,
    },
    userType: {
      type: 'string',
      enum: ['examiner', 'examinee'],
      default: 'examinee',
      required: true,
    },
    isDeleted: {
      type: 'boolean',
      default: false,
    },
    isVerified: {
      type: 'boolean',
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Exams', userSchema);
