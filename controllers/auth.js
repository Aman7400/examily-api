const User = require('../models/user');
const { getJWTToken } = require('../utils/jwt');
const { getHashedPassword, isValidPassword } = require('../utils/user');

const postRegisterNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // TODO - Add Validation
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await getHashedPassword(password),
      userType,
    });

    await newUser.save();
    res.json({ message: 'Account created successfully' });
  } catch (error) {
    console.log(error);
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
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    res.json({ message: 'User Profile', user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { postRegisterNewUser, postLoginUser, getUserProfile };
