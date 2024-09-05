'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addAddress, getAddressById } = require('../..');
const { setup } = require('../../../../testUtils/setup');
const { addressesSampleData } = require('../../../../testUtils/testData/addressData');
const { AddressModel } = require('../../../../models/Address');

afterAll(async () => {
  await setup.afterAll(true);
});
beforeEach(async () => {
  await AddressModel.deleteMany({});
});

describe('Get address', () => {
  test('get an address by id', async () => {
    const address = await addAddress(addressesSampleData);
    const result = await getAddressById(address[0]._id);
    expect(result.line1).toBe(addressesSampleData[0].line1);
  });
});

describe('Add addresses', () => {
  test('add a new address', async () => {
    const addressObject = addressesSampleData[0];
    const result = await addAddress(addressObject);
    expect(result[0].line1).toBe(addressesSampleData[0].line1);
  });

  test('add new addresses', async () => {
    const addressArray = addressesSampleData;
    const result = await addAddress(addressArray);
    expect(result.length).toBe(2);
  });
});
