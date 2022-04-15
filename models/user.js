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
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    userType: {
      type: 'string',
      enum: ['Examiner', 'Student'],
      default: 'Examiner',
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

// * User Model
const User = mongoose.model('Users', userSchema);

module.exports = { User };
