'use strict';
const { describe, expect, test } = require('@jest/globals');
const { addCompany } = require('../..');
const { setup } = require('../../../../testUtils/setup');
const {
  companySampleData,
} = require('../../../../testUtils/testData/companyData');
const { CompanyModel } = require('../../../../models/Company');

afterAll(async () => {
  await setup.afterAll(true);
});
beforeEach(async () => {
  await CompanyModel.deleteMany({});
});

describe('Add Company', () => {
  test('add a new company', async () => {
    const companyObject = companySampleData[0];
    const result = await addCompany(companyObject);
    expect(result[0].businessName).toBe(companyObject.businessName);
  });
});
