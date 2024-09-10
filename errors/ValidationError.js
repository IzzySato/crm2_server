const { INVALID_REQUEST_DATA } = require('../constants/errorMessage');
const CustomError = require('./CustomError');

class ValidationError extends CustomError {
  constructor(message = INVALID_REQUEST_DATA) {
    super(message, 400);
  }
}

module.exports = ValidationError;