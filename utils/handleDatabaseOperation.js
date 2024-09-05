
const ValidationError = require('../errors/ValidationError');
const CustomError = require('../errors/CustomError');
const logger = require('../lib/logger');

const handleDatabaseOperation = async (operation) => {
  try {
    return await operation();
  } catch (error) {
    logger.error(error.toString());
    if (error.name === 'CastError') {
      throw new ValidationError(`Invalid ID format`);
    }
    throw new CustomError('Database error occurred', 500);
  }
};

module.exports = handleDatabaseOperation;