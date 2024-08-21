'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addAddress, getAddressById } = require('..');
const { setup } = require('../../../testUtils/setup');
const Address = require('../../../models/Address');
const { addressesSampleData } = require('../../../testUtils/testData/addressData');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(() => {
  return new Promise(async (resolve, reject) => {
    try {
      await Address.deleteMany({});
      resolve();
    } catch (error) {
      reject(error);
    }
  })
});

describe('Get address', () => {
  test('get an address by id', async () => {
    const address = await addAddress(addressesSampleData);
    const result = await getAddressById(address[0]._id, { isCache: false });
    expect(result.line1).toBe(addressesSampleData[0].line1);
  });
});

describe('Add addresses', () => {
  // passing Address object
  test('add a new address', async () => {
    const result = await addAddress(addressesSampleData[0]);
    expect(result[0].line1).toBe(addressesSampleData[0].line1);
  });

  test('add new addresses', async () => {
    // passing array of Address
    const result = await addAddress(addressesSampleData);
    expect(result.length).toBe(2);
  });
});
