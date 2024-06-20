'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const dotenv = require('dotenv');
const Address = require('../../../database/models/Address');
const { address } = require('../../../database/test/testData/addressData');
const { setup } = require('../../../database/test/setup');

dotenv.config();

describe('Address routes', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);
  afterEach(() => {
    return new Promise(async (resolve, reject) => {
      try {
        await Address.deleteMany({});
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  });

  test('GET /address/:id', async () => {
    const { _id } = await Address.create(address);
    await request(process.env.SERVER_URL).get(`/address/${_id.toString()}`).expect(200);
  });

  test('POST /address', async () => {
    const response = await request(process.env.SERVER_URL).post('/address').send({
      name: 'work',
      line1: '6679 Robson street',
      line2: '',
      city: 'Vancouver',
      province: 'BC',
      postcode: 'V7T I0R',
      active: true
    }).set('Accept', 'application/json').expect(200);
    expect(response.body[0].name).toEqual('work');
    expect(response.body[0].line1).toEqual('6679 Robson street');
  });
});
