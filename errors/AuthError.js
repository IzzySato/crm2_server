const { UNAUTHORIZED_ACCESS } = require('../constants/errorMessage');
const CustomError = require('./CustomError');

class AuthError extends CustomError {
  constructor(message = UNAUTHORIZED_ACCESS) {
    super(message, 401);
  }
}

module.exports = AuthError;