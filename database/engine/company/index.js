const logger = require("../../../lib/logger");
const Company = require("../../models/Company");

const addCompany = async (company) => {
  try {
    company = (Array.isArray(company)) ? company : [company];
    return await Company.insertMany(company);
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = {
  addCompany
};