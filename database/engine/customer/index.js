'use strict';
const logger = require('../../../lib/logger');
const Customer = require('../../models/Customer');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * Insert customers
 * @param {*} customers array of the customers or object of customer
 * @returns { total: number, data: [Customer] }
 */
const addCustomer = async (customers) => {
  try {
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
    return await Customer.insertMany(customers);
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const updateCustomer = async (_id, updateField) => {
  try {
    return await Customer.findOneAndUpdate({ _id }, updateField, { returnDocument: 'after'});
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

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
  try {
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
    const baseQuery = Customer.where({ deletedAt: null }).find(findObj);
    const total = await Customer.where({ deletedAt: null }).find(findObj).countDocuments();
    const query = baseQuery
        .skip((parseInt(pageNum) - 1) * parseInt(length))
        .sort(sortBy)
        .limit(parseInt(length))
        .select(fields);
    if (isCache) {
      const data = await query.cache(`customers_${searchBy}_${pageNum}_${fields}_${length}_${sortBy}`);
      return { data, total };
    } else {
      const data = await query;
      return { data, total };
    }
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const getCustomerById = async (_id) => {
  try {
    return await Customer.findOne({ _id });
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = { addCustomer, getCustomerById, getCustomers, updateCustomer };
