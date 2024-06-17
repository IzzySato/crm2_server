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
    // customer = Array.isArray(customer) ? customer : [customer];
    return await Customer.insertMany(customer);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getCustomers = async ({ pageNum = 1, length = 10, sortBy = 'id' }) => {
  try {
    return await Customer.find().sort(sortBy)
      .skip(length * pageNum)
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

module.exports = { addCustomer, getCustomerById, getCustomers };
