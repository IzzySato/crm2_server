'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addCompany } = require('..');
const { setup } = require('../../../test/setup');
const Company = require('../../../models/Company');
const { company } = require('../../../test/testData/companyData');

describe('Test Company Database Functions', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);
  afterEach(() => {
    return new Promise(async (resolve, reject) => {
      try {
        await Company.deleteMany({});
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  });
  test('add a new company', async () => {
    const result = await addCompany(company);
    expect(result[0].businessName).toBe(company.businessName);
  });
});
