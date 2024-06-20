'use strict';
const logger = require('../../../lib/logger');
const Customer = require('../../models/Customer');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

const addCustomer = async (customer) => {
  try {
    if (Array.isArray(customer)) {
      customer = customer.map((c) => {
        return {
          ...c,
          addresses: c.addresses.map((address) =>
            convertIdStringToObjectId(address)
          ),
          companyId: convertIdStringToObjectId(c.companyId),
        };
      });
    } else {
      customer = {
        ...customer,
        addresses: customer.addresses.map((address) =>
          convertIdStringToObjectId(address)
        ),
        companyId: convertIdStringToObjectId(customer.companyId),
      };
    }
    const data = await Customer.insertMany(customer);
    return {
      total: data.length,
      data,
    };
  } catch (error) {
    logger.error(error.toString());
  }
};

const updateCustomer = async (_id, updateField) => {
  try {
    return await Customer.updateOne({ _id }, updateField);
  } catch (error) {
    logger.error(error.toString());
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
    return isCache
      ? await Customer.where({ deletedAt: null })
          .find(findObj)
          .skip((pageNum - 1) * length)
          .sort(sortBy)
          .limit(length)
          .select(fields)
          .cache('customers')
      : await Customer.where({ deletedAt: null })
          .find(findObj)
          .skip((pageNum - 1) * length)
          .sort(sortBy)
          .limit(length)
          .select(fields);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getCustomerById = async (id, { isCache = false }) => {
  try {
    return isCache
      ? await Customer.findOne({ _id: id }).cache(id)
      : await Customer.findOne({ _id: id });
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { addCustomer, getCustomerById, getCustomers, updateCustomer };
