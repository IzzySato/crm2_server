'use strict';
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
          addresses: customer.addresses.map((address) =>
            convertIdStringToObjectId(address)
          ),
          companyId: convertIdStringToObjectId(customer.companyId),
        };
      });
    } else {
      customers = {
        ...customers,
        addresses: customers.addresses.map((address) =>
          convertIdStringToObjectId(address)
        ),
        companyId: convertIdStringToObjectId(customers.companyId),
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
 * @param {*} param0 params
 * @param {*} param1 cache options
 * @returns customers array
 */
const getCustomers = async (
  {
    pageNum = 1,
    length = 10,
    sortBy = '_id',
    fields = 'firstName lastName email phone _id',
    searchBy = '',
  },
  { isCache = false }
) => {
  return handleDatabaseOperation(async () => {
    const findObj =
      searchBy === ''
        ? {}
        : {
            $or: [
              { firstName: { $regex: searchBy, $options: 'i' } },
              { lastName: { $regex: searchBy, $options: 'i' } },
              { email: { $regex: searchBy, $options: 'i' } },
              { phone: { $regex: searchBy, $options: 'i' } },
            ],
          };
    const baseQuery = CustomerModel.where({ deletedAt: null }).find(findObj);
    const total = await CustomerModel.where({ deletedAt: null })
      .find(findObj)
      .countDocuments();
    const query = baseQuery
      .skip((parseInt(pageNum) - 1) * parseInt(length))
      .sort(sortBy)
      .limit(parseInt(length))
      .select(fields);
    if (isCache) {
      const data = await query.cache(
        `customers_${searchBy}_${pageNum}_${fields}_${length}_${sortBy}`
      );
      return { data, total };
    } else {
      const data = await query;
      return { data, total };
    }
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
