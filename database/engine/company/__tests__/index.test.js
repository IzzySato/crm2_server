const { describe, expect, test } = require('@jest/globals');
const { addCompany } = require('..');
const { setup } = require('../../../test/setup');
const { ObjectId } = require('mongodb');

describe('Test Company Database Functions', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);
  test('add a new company', async () => {
    const company = {
      businessName: 'test company name',
      logoImg: null,
      addressIds: [new ObjectId('51e0373c6f35bd826f47e9a1')],
      phone: '123-456-2456',
      tradeType: ['concrete']
    };
    const result = await addCompany(company);
    expect(result[0].businessName).toBe(company.businessName);
  });
});
