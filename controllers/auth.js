const { User } = require('../models/user');
const Joi = require('joi');

const { getJWTToken } = require('../utils/jwt');
const { getHashedPassword, isValidPassword } = require('../utils/user');

const postRegisterNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    const user = await User.findOne({ email: email });

    // * Check if user is already exists with given mail
    if (user) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // * Validations
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
      }),
      lastName: Joi.string().allow(''),
      password: Joi.string().required().messages({
        'any.required': 'Password is required',
      }),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .messages({
          'any.required': 'Email is required',
          'string.email': 'Email is Invalid',
        }),
      userType: Joi.string().required().messages({
        'any.required': 'User type is required',
      }),
    });

    const { error } = schema.validate({
      firstName,
      lastName,
      email,
      password,
      userType,
    });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await getHashedPassword(password),
      userType,
    });
    await newUser.save();
    res.json({ message: 'Account created successfully', user: newUser._id });
  } catch (error) {
    next(error);
  }
};

const postLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    if (!(await isValidPassword(password, user.password))) {
      res.status(401);
      throw new Error('Invalid password');
    }
    res.json({
      message: 'Logged in successfully',
      token: await getJWTToken(user._id.toString()),
      userType: user.userType,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    // * if userType is Student, only then send results[] with All exam results
    let user;
    if (req.user.userType === 'Examiner') {
      user = await User.findById(req.user._id).select('-results');
    } else {
      user = req.user;
    }

    res.json({ message: 'User Profile', user });
  } catch (error) {
    next(error);
  }
};

module.exports = { postRegisterNewUser, postLoginUser, getUserProfile };
