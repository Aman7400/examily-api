import { Schema, model } from 'mongoose';

// * User Schema
const userSchema = new Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

export default model('Exams', userSchema);
