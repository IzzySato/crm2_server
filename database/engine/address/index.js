const logger = require('../../../lib/logger');
const Address = require('../../models/Address');

const addAddress = async (address) => {
  try {
    return await Address.create(address);
  } catch (error) {
    logger.error(error);
  }
};

const addAddresses = async (addresses) => {
  try {
    return await Address.insertMany(addresses);
  } catch (error) {
    logger.error(error);
  }
};

const getAddressById = async (id, isCache = false) => {
  try {
    return isCache ? await Address.findOne({ _id: id }).cache(id) : await Address.findOne({ _id: id });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

module.exports = { addAddresses, getAddressById, addAddress };
