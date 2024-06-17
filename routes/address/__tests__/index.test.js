'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

describe('Address routes', () => {
  test('GET /address', async () => {
    await request(process.env.SERVER_URL).get('/address').expect(200);
  });

  test('POST /address', async () => {
    await request(process.env.SERVER_URL).post('/address').send({
      name: 'work',
      line1: '6679 Robson street',
      line2: '',
      city: 'Vancouver',
      province: 'BC',
      postcode: 'V7T I0R',
      active: true
    }).set('Accept', 'application/json').expect(200);
  });
});
