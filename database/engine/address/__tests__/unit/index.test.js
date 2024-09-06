'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addAddress, getAddressById } = require('../..');
const { setup } = require('../../../../testUtils/setup');
const {
  addressesSampleData,
} = require('../../../../testUtils/testData/addressData');
const { AddressModel } = require('../../../../models/Address');

afterAll(async () => {
  await setup.afterAll(true);
});
beforeEach(async () => {
  await AddressModel.deleteMany({});
});

describe('Get address', () => {
  test('get an address by id', async () => {
    const addressObject = addressesSampleData[0];
    const address = await AddressModel.create(addressObject);
    const result = await getAddressById(address._id.toString());
    expect(result.line1).toBe(addressObject.line1);
  });

  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(getAddressById(invalidId)).rejects.toThrow(
      'Invalid ID format'
    );
  });
});

describe('Add address', () => {
  test('add a new address Object', async () => {
    const addressObject = addressesSampleData[0];
    const result = await addAddress(addressObject);
    expect(result[0].line1).toBe(addressesSampleData[0].line1);
  });

  test('Add new addresses Array', async () => {
    const addressArray = addressesSampleData;
    const result = await addAddress(addressArray);
    expect(result.length).toBe(2);
  });
});
