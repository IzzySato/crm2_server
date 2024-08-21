'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const dotenv = require('dotenv');
const { SERVER_URL } = require('../../../config/keys');
const { generateJwtToken } = require('../../../lib/jwt');

// Once staging is created, change the folder name to __tests__ and file name to index.test.js
// Not testing in CI

dotenv.config();

describe('Customer routes', () => {
  test('GET /customer', async () => {
    const token = generateJwtToken('51e0373c6f35bd826f47e9a1');
    await request(SERVER_URL)
      .get('/customer')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('POST /customer', async () => {
    await request(SERVER_URL)
      .post('/customer')
      .send({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@mail.com',
        phone: '1235672345',
        addresses: ['5063114bd386d8fadbd6b004'],
        tags: [],
        companyId: '6348acd2e1a47ca32e79f46f',
      })
      .set('Accept', 'application/json')
      .expect(200);
  });
});
