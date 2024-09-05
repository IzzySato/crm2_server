const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);  // 404 Not Found
  }
}

module.exports = NotFoundError;