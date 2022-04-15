const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, '../private.pem'));

const verifyUser = async (req, res, next) => {
  let token;

  // * If the token is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // * Fetch  the token from the header
      token = req.headers.authorization.split(' ')[1];
      // * Verify the token
      const decodedToken = jwt.verify(token, privateKey);
      //  * Get User from token and add it to the request
      req.user = await User.findById(decodedToken.id).select('-password'); // * Remove the password from the user object
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      next(new Error('Token is invalid'));
    }
  }
  //  * If no token
  if (!token) {
    try {
      res.status(401);
      throw new Error('Unauthorized Access denied. Please Login');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { verifyUser };
