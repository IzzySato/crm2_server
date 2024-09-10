'use strict';
const { getDatabaseQuery } = require('../../../utils/getQuery');
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { CustomerModel } = require('../../models/Customer');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * handleDatabaseOperation is handling errors
 * Insert customers
 * @param {*} customers array of the customers or object of customer
 * @returns { total: number, data: [Customer] }
 */
const addCustomer = async (customers) => {
  return handleDatabaseOperation(async () => {
    if (Array.isArray(customers)) {
      customers = customers.map((customer) => {
        return {
          ...customer,
          addresses: customer.addresses ? customer.addresses.map((address) =>
            convertIdStringToObjectId(address)
          ) : [],
          companyId: customer.companyId ? convertIdStringToObjectId(customer.companyId) : null,
        };
      });
    } else {
      customers = {
        ...customers,
        addresses: customers.addresses ? customers.addresses.map((address) =>
          convertIdStringToObjectId(address)
        ) : [],
        companyId: customers.companyId ? convertIdStringToObjectId(customers.companyId) : null,
      };
    }
    return await CustomerModel.insertMany(customers);
  });
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string customer id
 * @param {*} updateField object customer field that need to update
 * @returns
 */
const updateCustomer = async (_id, updateField) => {
  return handleDatabaseOperation(
    async () =>
      await CustomerModel.findOneAndUpdate({ _id }, updateField, {
        returnDocument: 'after',
      })
  );
};

/**
 * handleDatabaseOperation is handling errors
 * params.sortBy e.g. '_id'
 * params.fields should be database fiels string e.g. 'firstName lastName email phone _id'
 * @param { pageNum: number, length: number, sortBy: string, fields: string, searchBy: string}
 * @param { isCache: boolean }
 * @returns
 */
const getCustomers = async (params, { isCache = false }) => {
  return handleDatabaseOperation(async () => {
    const filterByArray = ['firstName', 'lastName', 'email', 'phone'];
    return await getDatabaseQuery({
      model: CustomerModel,
      params,
      filterByArray,
      isCache,
    });
  });
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string customer id
 * @returns customer obejct with the id
 */
const getCustomerById = async (_id) => {
  return handleDatabaseOperation(
    async () => await CustomerModel.findOne({ _id })
  );
};

module.exports = { addCustomer, getCustomerById, getCustomers, updateCustomer };
