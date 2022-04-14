const User = require('../models/user');
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
    //   TODO - genrate JWT
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { postRegisterNewUser, postLoginUser };
