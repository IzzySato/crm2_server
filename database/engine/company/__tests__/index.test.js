'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addCompany } = require('..');
const { setup } = require('../../../testUtils/setup');
const Company = require('../../../models/Company');
const { companySampleData } = require('../../../testUtils/testData/companyData');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(async () => {
  await Company.deleteMany({});
});

describe('Add Company', () => {
  test('add a new company', async () => {
    const companyObject = companySampleData[0];
    const result = await addCompany(companyObject);
    expect(result[0].businessName).toBe(companySampleData[0].businessName);
  });
});
