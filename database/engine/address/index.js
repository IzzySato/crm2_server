const logger = require('../../../lib/logger');
const Address = require('../../models/Address');

const addAddress = async (address) => {
  try {
    address = (Array.isArray(address)) ? address: [address]
    return await Address.insertMany(address);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getAddressById = async (id, isCache = false) => {
  try {
    return isCache ? await Address.findOne({ _id: id }).cache(id) : await Address.findOne({ _id: id });
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { getAddressById, addAddress };
