const { describe, expect, test } = require('@jest/globals');
const mongoose = require('mongoose');
const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('Test Authentication', () => {
  test('GET /google', async () => {
    const res = await request(process.env.SERVER_URL).get('/');
    expect(res.statusCode).toBe(200);
  });
});
