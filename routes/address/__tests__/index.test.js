const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

describe('Address routes', () => {
  test('GET /address', async () => {
    const res = await request(process.env.SERVER_URL)
                      .get('/address')
                      .expect(200);
  });
});
