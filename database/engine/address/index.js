'use strict';
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { AddressModel } = require('../../models/Address');

/**
 * handleDatabaseOperation is handling errors
 * add addresses to database
 * @param {*} address object or array
 * @returns array of addresses that inserted
 */
const addAddress = async (address) => {
  return await handleDatabaseOperation(async () => {
    address = Array.isArray(address) ? address : [address];
    return await AddressModel.insertMany(address);
  });
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string address id
 * @returns address object
 */
const getAddressById = async (_id) => {
  return await handleDatabaseOperation(
    async () => await AddressModel.findOne({ _id })
  );
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string address id
 * @param {*} updateField object of address field that need to update
 * @returns updated adddress object
 */
const updateAddress = async (_id, updateField) => {
  return await handleDatabaseOperation(async () =>
    await AddressModel.findOneAndUpdate({ _id }, updateField, {
      returnDocument: 'after',
    })
  );
};

module.exports = { getAddressById, addAddress, updateAddress };
