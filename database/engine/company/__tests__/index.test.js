'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addCompany } = require('..');
const { setup } = require('../../../testSetUp/setup');
const Company = require('../../../models/Company');
const { companySampleData } = require('../../../testSetUp/testData/companyData');

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

describe('Add Company', () => {
  test('add a new company', async () => {
    const result = await addCompany(companySampleData[0]);
    expect(result[0].businessName).toBe(companySampleData[0].businessName);
  });
});
