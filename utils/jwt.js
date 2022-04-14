const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, '../private.pem'));

const getJWTToken = (id) => {
  return jwt.sign({ id }, privateKey, {
    expiresIn: '30d',
  });
};

module.exports = { getJWTToken };
