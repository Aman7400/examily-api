const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, '../private.pem'));

const getJWTToken = async (id) => {
  return await jwt.sign(id, privateKey, { algorithm: 'RS256' });
};

module.exports = { getJWTToken };
