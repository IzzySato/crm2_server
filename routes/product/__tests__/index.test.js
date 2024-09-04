'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../../../app');
const { setup, addUserGetToken } = require('../../../database/testUtils/setup');
const Product = require('../../../database/models/Product');
const {
  productSampleData,
} = require('../../../database/testUtils/testData/productData');
const User = require('../../../database/models/User');

beforeAll(() => {
  setup.beforeAllNoCache();
});
afterAll(setup.afterAll);
beforeEach(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
});

describe('GET Product routes', () => {
  test('GET /product', async () => {
    const token = await addUserGetToken();
    await request(app)
      .get('/product')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /product/:id', async () => {
    const productObject = productSampleData[0];
    const product = await Product.create(productObject);
    const token = await addUserGetToken();
    await request(app)
      .get(`/product/${product._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });
});
