const CustomError = require('./CustomError');

class AuthError extends CustomError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

module.exports = AuthError;