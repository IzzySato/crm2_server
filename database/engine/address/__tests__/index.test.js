'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addAddress, getAddressById } = require('..');
const { setup } = require('../../../test/setup');
const Address = require('../../../models/Address');
const { address, addresses } = require('../../../test/testData/addressData');

describe('Test Address Database Functions', () => {
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

  test('add a new address', async () => {
    const result = await addAddress(address);
    expect(result[0].line1).toBe(address.line1);
  });

  test('add new addresses', async () => {
    const result = await addAddress(addresses);
    expect(result.length).toBe(2);
  });

  test('get an address by id', async () => {
    const { _id } = await Address.create(address);
    const result = await getAddressById(_id, { isCache: false });
    expect(result.line1).toBe('11 main street');
  });
});

