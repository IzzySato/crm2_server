'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../test/setup');
const { addCustomer, getCustomerById, updateCustomer, getCustomers } = require('..');
const { customers, customer } = require('../../../test/testData/customerData');
const Customer = require('../../../models/Customer');

describe('Customer Model', () => {
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
    })
  });

  test('get customer by id', async () => {
    const addedCustomer = await addCustomer(customer);
    const id = addedCustomer.data[0]._id.toString();
    const result = await getCustomerById(id);
    expect(result.firstName).toBe(customer.firstName);
  });

  test('get customers', async () => {
    const addedCustomers = await addCustomer(customers);
    expect(addedCustomers.total).toBe(19);
    // Filtered out if deletedAt is not null
    // Default to return first 10
    const result = await getCustomers({});
    expect(result.length).toBe(10);
    expect(result[0].firstName).toBe('Liam');
  });

  test('get customers with params', async () => {
    const addedCustomers = await addCustomer(customers);
    expect(addedCustomers.total).toBe(19);
    // Filtered out if deletedAt is not null
    const result = await getCustomers({ pageNum: 1, length: 10, sortBy: 'firstName'});
    expect(result.length).toBe(10);
    expect(result[0].firstName).toBe('Barbara');
  });

  test('add a customer', async () => {
    const result = await addCustomer(customer);
    expect(result.total).toBe(1);
    expect(result.data[0].firstName).toBe(customer.firstName);
    expect(result.data[0].lastName).toBe(customer.lastName);
  });

  test('update a customer', async () => {
    const addedCustomer = await addCustomer(customer);
    const id = addedCustomer.data[0]._id.toString();
    const result = await updateCustomer({ _id: id }, { firstName: 'Ben'});
    expect(result.modifiedCount).toBe(1);
  });

  test('soft delete customer', async () => {
    const addedCustomer = await addCustomer(customer);
    const id = addedCustomer.data[0]._id.toString();
    const today = new Date();
    const result = await updateCustomer({ _id: id }, { deletedAt: today });
    expect(result.modifiedCount).toBe(1);
  });
});