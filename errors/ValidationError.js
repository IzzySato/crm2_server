const CustomError = require('./CustomError');

class ValidationError extends CustomError {
  constructor(message = 'Invalid request data') {
    super(message, 400);  // 400 Bad Request
  }
}

module.exports = ValidationError;