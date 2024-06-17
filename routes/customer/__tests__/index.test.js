'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

describe('Customer routes', () => {
  test('GET /customer', async () => {
    await request(process.env.SERVER_URL).get('/customer').expect(200);
  });

  test('POST /customer', async () => {
    await request(process.env.SERVER_URL).post('/customer').send({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@mail.com',
      phone: '1235672345',
      addresses: ['5063114bd386d8fadbd6b004'],
      tags: [],
      companyId: '6348acd2e1a47ca32e79f46f'
    }).set('Accept', 'application/json').expect(200);
  });

  test('PUT /customer', async () => {
    await request(process.env.SERVER_URL).put('/customer').send({
      findField: { email: 'alice.smith@mail.com' },
      updateField: { firstName: 'Test' }
    }).set('Accept', 'application/json').expect(200);
  });
});
