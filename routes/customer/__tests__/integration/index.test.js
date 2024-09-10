'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const {
  setup,
  addUserGetToken,
} = require('../../../../database/testUtils/setup');
const {
  customerSampleData,
} = require('../../../../database/testUtils/testData/customerData');
const app = require('../../../../app');
const { addCustomer } = require('../../../../database/engine/customer');
const { CustomerModel } = require('../../../../database/models/Customer');
const { UserModel } = require('../../../../database/models/User');
const { MISSING_REQUIRED_FIELDS } = require('../../../../constants/errorMessage');
const { STATUS } = require('../../../../constants/status');

let token = '';
let authUserId = '';

beforeAll(async () => {
  setup.turnOffCache();
  const result = await addUserGetToken();
  token = result.token;
  authUserId = result.userId
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await CustomerModel.deleteMany({});
  await UserModel.deleteOne({ _id: authUserId });
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

  test('GET /customer/:id not exsist customer id', async () => {
    const notExistCustomerId = '66d8d38041c908d46609a388';
    await request(app)
      .get(`/customer/${notExistCustomerId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });

  test('GET /customer/:id invalid customer id', async () => {
    const invalidCustomerId = 'invalid_id';
    await request(app)
      .get(`/customer/${invalidCustomerId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400);
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

  test('POST /customer missing required body field', async () => {
    const customerObject = {
      firstName: 'Izzy',
      phone: '123-235-7388',
    };
    const response = await request(app)
      .post('/customer')
      .send(customerObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
    expect(response.body.status).toEqual(STATUS.FAIL);
    expect(response.body.message).toEqual(MISSING_REQUIRED_FIELDS);
  });
});

describe('PUT Customer routes', () => {
  test('PUT /customer/:id update firstName', async () => {
    const addedCustomer = await CustomerModel.create(customerSampleData[0]);
    const response = await request(app)
      .put(`/customer/${addedCustomer._id.toString()}`)
      .send({ firstName: 'updated_name' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.firstName).toEqual('updated_name');
  });

  test('PUT /customer/:id invalid customer id', async () => {
    const invalidId = 'invalid_customer_id';
    await request(app)
      .put(`/customer/${invalidId}`)
      .send({ firstName: 'firstname' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PUT /customer/:id not exist customer id', async () => {
    const notExistId = '66d8d38041c908d46609a388';
    await request(app)
      .put(`/customer/${notExistId}`)
      .send({ firstName: 'firstname' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});
