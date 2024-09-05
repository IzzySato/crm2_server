'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../../../../app');
const { setup, addUserGetToken } = require('../../../../database/testUtils/setup');
const {
  productSampleData,
} = require('../../../../database/testUtils/testData/productData');
const { ProductModel } = require('../../../../database/models/Product');
const { UserModel } = require('../../../../database/models/User');

beforeAll(() => {
  setup.turnOffCache();
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await ProductModel.deleteMany({});
  await UserModel.deleteMany({});
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
    const product = await ProductModel.create(productObject);
    const token = await addUserGetToken();
    await request(app)
      .get(`/product/${product._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });
});
