
const ValidationError = require('../errors/ValidationError');
const CustomError = require('../errors/CustomError');
const logger = require('../lib/logger');
const { INVALID_ID_FORMAT, DATABASE_ERROR } = require('../constants/errorMessage');
const { CAST_ERROR } = require('../constants/mongoError');

/**
 * Wapper for database operation to handle errors
 * @param {*} operation database function
 * @returns database results
 */
const handleDatabaseOperation = async (operation) => {
  try {
    return await operation();
  } catch (error) {
    logger.error(error.toString());
    if (error.name === CAST_ERROR) {
      throw new ValidationError(INVALID_ID_FORMAT);
    }
    throw new CustomError(DATABASE_ERROR, 500);
  }
};

module.exports = handleDatabaseOperation;