'use strict';
const logger = require('../../../lib/logger');
const Address = require('../../models/Address');

const addAddress = async (address) => {
  try {
    address = Array.isArray(address) ? address : [address];
    return await Address.insertMany(address);
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const getAddressById = async (_id) => {
  try {
    return await Address.findOne({ _id });
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const updateAddress = async (_id, updateField) => {
  try {
    return await Address.findOneAndUpdate({ _id }, updateField, { returnDocument: 'after'});
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = { getAddressById, addAddress, updateAddress };
