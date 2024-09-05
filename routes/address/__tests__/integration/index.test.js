'use strict';
const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const {
  addressesSampleData,
} = require('../../../../database/testUtils/testData/addressData');
const { setup, addUserGetToken } = require('../../../../database/testUtils/setup');
const app = require('../../../../app');
const { AddressModel } = require('../../../../database/models/Address');
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
  await UserModel.deleteMany({});
  await AddressModel.deleteMany({});
});

describe('GET Address routes', () => {
  test('GET /address/:id return the correct data', async () => {
    const addressObject = addressesSampleData[0];
    const address = await AddressModel.create(addressObject);
    const response = await request(app)
      .get(`/address/${address._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toHaveProperty('id', address._id.toString());
    expect(response.body).toHaveProperty('line1', address.line1);
  });

  test('GET /address/:id not exsist address id', async () => {
    // 66d8d38041c908d46609a388 is not address id
    await request(app)
      .get('/address/66d8d38041c908d46609a388')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });

  test('GET /address/:id invalid address id', async () => {
    await request(app)
      .get('/address/invalid_id')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('POST Address routes', () => {
  test('POST /address', async () => {
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

  test('POST /address missing required body field', async () => {
    const addressObject = {
      line2: '',
      active: true
    };
    const response = await request(app)
      .post('/address')
      .send(addressObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
    expect(response.body.status).toEqual('fail');
    expect(response.body.message).toEqual('Missing field line1');
  });
});

describe('PUT Address routes', () => {
  test('PUT /address/:id', async () => {
    const addressObject = addressesSampleData[0];
    const address = await AddressModel.create(addressObject);
    const response = await request(app)
      .put(`/address/${address._id.toString()}`)
      .send({ line1: 'new line' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.line1).toEqual('new line');
  });

  test('PUT /address/:id invalid address id', async () => {
    await request(app)
      .put('/address/invalid_address_id')
      .send({ line1: 'new line' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PUT /address/:id not exist address id', async () => {
    // 66d8d38041c908d46609a388 is not address id
    await request(app)
      .put('/address/66d8d38041c908d46609a388')
      .send({ line1: 'new line' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});
