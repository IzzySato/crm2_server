const {
  MISSING_REQUIRED_FIELDS,
  INVALID_TYPE,
  ARRAY_EMPTY,
} = require('../constants/errorMessage');
const ValidationError = require('../errors/ValidationError');

const validateRequiredField = (requiredFiels, obj) => {
  requiredFiels.forEach(({ name, type }) => {
    if (!obj[name]) {
      throw new ValidationError(MISSING_REQUIRED_FIELDS);
    }
    if (typeof obj[name] !== type) {
      throw new ValidationError(INVALID_TYPE);
    }
  });
};

const validateInputs = ({ requiredFiels, bodyData }) => {
  if (Array.isArray(bodyData)) {
    if (bodyData.length <= 0) {
      throw new ValidationError(ARRAY_EMPTY);
    }
    bodyData.forEach((obj) => validateRequiredField(requiredFiels, obj));
  } else {
    validateRequiredField(requiredFiels, bodyData);
  }
};

module.exports = {
  validateInputs,
};
