'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../testUtils/setup');
const {
  addCustomer,
  getCustomerById,
  updateCustomer,
  getCustomers,
} = require('..');
const { customerSampleData } = require('../../../testUtils/testData/customerData');
const Customer = require('../../../models/Customer');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(() => {
  return new Promise(async (resolve, reject) => {
    try {
      await Customer.deleteMany({});
      resolve();
    } catch (error) {
      reject(error);
    }
  });
});

describe('Get Customer', () => {
  test('get customer by id', async () => {
    const addedCustomer = await addCustomer(customerSampleData[0]);
    const id = addedCustomer.data[0]._id.toString();
    const result = await getCustomerById(id, { isCache: false });
    expect(result.firstName).toBe(customerSampleData[0].firstName);
  });

  test('get customers', async () => {
    const addedCustomers = await addCustomer(customerSampleData);
    expect(addedCustomers.total).toBe(19);
    // Filtered out if deletedAt is not null
    // Default to return first 10
    const result = await getCustomers({}, { isCache: false });
    expect(result.data.length).toBe(10);
    expect(result.data[0].firstName).toBe('Liam');
  });

  test('get customers with params', async () => {
    const addedCustomers = await addCustomer(customerSampleData);
    expect(addedCustomers.total).toBe(19);
    // Filtered out if deletedAt is not null
    const result = await getCustomers({
      pageNum: 1,
      length: 10,
      sortBy: 'firstName',
      fields: 'firstName lastName email phone _id'
    }, { isCache: false });
    expect(result.data.length).toBe(10);
    expect(result.data[0].firstName).toBe('Barbara');
  });
});

describe('Add Customer', () => {
  // passing customer object
  test('add a customer object', async () => {
    const result = await addCustomer(customerSampleData[0]);
    expect(result.total).toBe(1);
    expect(result.data[0].firstName).toBe(customerSampleData[0].firstName);
    expect(result.data[0].lastName).toBe(customerSampleData[0].lastName);
  });

  test('add customers array', async () => {
    // passing customer array
    const result = await addCustomer(customerSampleData);
    expect(result.total).toBe(19);
    expect(result.data[0].firstName).toBe(customerSampleData[0].firstName);
    expect(result.data[0].lastName).toBe(customerSampleData[0].lastName);
  });
});

describe('Update Customer', () => {
  test('update a customer', async () => {
    const addedCustomer = await addCustomer(customerSampleData[0]);
    const id = addedCustomer.data[0]._id.toString();
    const result = await updateCustomer(id, { firstName: 'Ben' });
    expect(result.firstName).toBe('Ben');
  });

  test('soft delete customer', async () => {
    const addedCustomer = await addCustomer(customerSampleData[0]);
    const id = addedCustomer.data[0]._id.toString();
    const today = new Date();
    const result = await updateCustomer( id, { deletedAt: today });
    expect(result.deletedAt).not.toBe(null);
  });
});
