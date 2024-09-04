const validateRequiredField = (requiredFiels, obj) => {
  requiredFiels.forEach(({ name, type }) => {
    if (!obj[name]) {
      throw new Error(`Missing field ${name}`);
    }
    if (typeof obj[name] !== type) {
      throw new Error(`Invalid type for field: ${name}, expected ${type}`);
    }
  });
};

const validateInputs = ({ requiredFiels, bodyData, modelName }) => {
  if (Array.isArray(bodyData)) {
    if (bodyData.length <= 0) {
      throw new Error(`${modelName} array cannot be empty`);
    }
    bodyData.forEach((obj) => validateRequiredField(requiredFiels, obj));
  } else {
    validateRequiredField(requiredFiels, bodyData);
  }
};

module.exports = {
  validateInputs,
};
