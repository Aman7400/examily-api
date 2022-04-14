const bcryptjs = require('bcryptjs');

const getHashedPassword = async (password) => {
  return await bcryptjs.hash(password, 10);
};

const isValidPassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

module.exports = { getHashedPassword, isValidPassword };
