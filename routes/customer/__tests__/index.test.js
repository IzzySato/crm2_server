'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const { setup, addUserGetToken } = require('../../../database/testUtils/setup');
const User = require('../../../database/models/User');
const Customer = require('../../../database/models/Customer');
const {
  customerSampleData,
} = require('../../../database/testUtils/testData/customerData');
const app = require('../../../app');

const getCustomerObj = () => {
  const customer = customerSampleData[0];
  customer.companyId = customer.companyId.toString();
  customer.addresses = customer.addresses.map((address) => address.toString());
  return customer;
};

beforeAll(() => {
  setup.beforeAllNoCache();
});
afterAll(setup.afterAll);
afterEach(async () => {
  await Customer.deleteMany({});
  await User.deleteMany({});
});

describe('GET Customer routes', () => {
  test('GET /customer returns status 200', async () => {
    const token = await addUserGetToken();
    await request(app)
      .get('/customer')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /customer/:id', async () => {
    const customerObject = customerSampleData[0];
    const customer = await Customer.create(customerObject);
    const token = await addUserGetToken();
    await request(app)
      .get(`/customer/${customer._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });
});

describe('POST Customer routes', () => {
  test('POST /customer', async () => {
    const token = await addUserGetToken();
    const newCustomer = getCustomerObj();
    const response = await request(app)
      .post('/customer')
      .set('authorization', `Bearer ${token}`)
      .send(newCustomer)
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data[0].firstName).toBe(newCustomer.firstName);
  });
});
