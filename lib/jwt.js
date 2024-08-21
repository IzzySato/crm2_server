const jwt = require('jsonwebtoken');
const logger = require('./logger');

/**
 * generate JWT token using user id
 * @param {*} userId string user id
 */
const generateJwtToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    logger.error(error.toString());
  }
};

/**
 * verify the JWT Token
 * @param {*} token String JWT token
 */
const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return { err }
    }
    return user;
  });
};

module.exports = {
  generateJwtToken,
  verifyJwtToken
};