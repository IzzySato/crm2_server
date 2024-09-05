'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const { setup, addUserGetToken } = require('../../../../database/testUtils/setup');
const {
  customerSampleData,
} = require('../../../../database/testUtils/testData/customerData');
const app = require('../../../../app');
const {
  addCustomer,
} = require('../../../../database/engine/customer');
const { CustomerModel } = require('../../../../database/models/Customer');
const { UserModel } = require('../../../../database/models/User');

let token = ''

beforeAll(async () => {
  setup.turnOffCache();
  token = await addUserGetToken();
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await CustomerModel.deleteMany({});
  await UserModel.deleteMany({});
});

describe('GET Customer routes', () => {
  test('GET /customer returns status 200', async () => {
    await request(app)
      .get('/customer')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /customer/:id', async () => {
    const customers = await addCustomer(customerSampleData[0]);
    const response = await request(app)
      .get(`/customer/${customers[0]._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.firstName).toBe(customers[0].firstName);
  });
});

describe('POST Customer routes', () => {
  test('POST /customer', async () => {
    const newCustomer = {
      firstName: 'Liam',
      lastName: 'Jones',
      email: 'liam.jones@mail.com',
      phone: '7863462783',
      addresses: [],
      tags: [],
      companyId: '5063114bd386d8fadbd6b004',
    };
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
