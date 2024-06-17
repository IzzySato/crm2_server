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
      data
    }
  } catch (error) {
    logger.error(error.toString());
  }
};

const updateCustomer = async (findField, updateField) => {
  try {
    return await Customer.updateOne(findField, updateField);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getCustomers = async ({ pageNum = 1, length = 10, sortBy = '_id' }) => {
  try {
    return await Customer.where({ deletedAt: null })
                        .skip((pageNum - 1) * length)
                        .sort(sortBy)
                        .limit(length);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getCustomerById = async (id, isCache = false) => {
  try {
    return isCache
      ? await Customer.findOne({ _id: id }).cache(id)
      : await Customer.findOne({ _id: id });
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { addCustomer, getCustomerById, getCustomers, updateCustomer };
