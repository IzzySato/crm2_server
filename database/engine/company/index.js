'use strict';
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { CompanyModel } = require('../../models/Company');

/**
 * handleDatabaseOperation is handling errors
 * add company to database
 * @param company object or array Company
 * @returns array of company that inserted
 */
const addCompany = async (company) => {
  return await handleDatabaseOperation(async () => {
    company = Array.isArray(company) ? company : [company];
    return await CompanyModel.insertMany(company);
  });
};

module.exports = {
  addCompany,
};
