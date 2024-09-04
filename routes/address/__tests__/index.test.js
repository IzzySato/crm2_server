'use strict';
const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const Address = require('../../../database/models/Address');
const User = require('../../../database/models/User');
const {
  addressesSampleData,
} = require('../../../database/testUtils/testData/addressData');
const { setup, addUserGetToken } = require('../../../database/testUtils/setup');
const app = require('../../../app');

beforeAll(() => {
  setup.beforeAllNoCache();
});
afterAll(setup.afterAll);
beforeEach(async () => {
  await User.deleteMany({});
  await Address.deleteMany({});
});

describe('GET Address routes', () => {
  test('GET /address/:id return the correct data', async () => {
    const token = await addUserGetToken();
    const addressObject = addressesSampleData[0];
    const address = await Address.create(addressObject);
    const response = await request(app)
      .get(`/address/${address._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toHaveProperty('id', address._id.toString());
    expect(response.body).toHaveProperty('line1', address.line1);
  });
});

describe('POST Address routes', () => {
  test('POST /address', async () => {
    const token = await addUserGetToken();
    const addressObject = addressesSampleData[0];
    const response = await request(app)
      .post('/address')
      .send(addressObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data[0].name).toEqual(addressObject.name);
    expect(response.body.data[0].line1).toEqual(addressObject.line1);
  });
});

describe('PUT Address routes', () => {
  test('PUT /address/:id', async () => {
    const token = await addUserGetToken();
    const addressObject = addressesSampleData[0];
    const address = await Address.create(addressObject);
    const response = await request(app)
      .put(`/address/${address._id.toString()}`)
      .send({ line1: 'new line' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.line1).toEqual('new line');
  });
});
