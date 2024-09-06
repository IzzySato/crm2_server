'use strict';
const { describe, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../../../../app');
const {
  setup,
  addUserGetToken,
} = require('../../../../database/testUtils/setup');
const {
  productSampleData,
} = require('../../../../database/testUtils/testData/productData');
const { ProductModel } = require('../../../../database/models/Product');
const { UserModel } = require('../../../../database/models/User');

let token = '';
let authUserId = '';

beforeAll(async () => {
  setup.turnOffCache();
  const result = await addUserGetToken();
  token = result.token;
  authUserId = result.userId
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await ProductModel.deleteMany({});
  await UserModel.deleteOne({ _id: authUserId });
});

describe('GET Product routes', () => {
  test('GET /product', async () => {
    await request(app)
      .get('/product')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /product/:id', async () => {
    const productObject = productSampleData[0];
    const product = await ProductModel.create(productObject);
    const response = await request(app)
      .get(`/product/${product._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toHaveProperty('id', product._id.toString());
  });

  test('GET /product/:id not exsist product id', async () => {
    const notExistProductId = '66d8d38041c908d46609a388';
    await request(app)
      .get(`/product/${notExistProductId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });

  test('GET /product/:id invalid product id', async () => {
    const invalidProductId = 'invalid_id';
    await request(app)
      .get(`/product/${invalidProductId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('POST Product routes', () => {
  test('POST /product', async () => {
    const productObject = productSampleData[0];
    const response = await request(app)
      .post('/product')
      .send(productObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data[0].name).toEqual(productObject.name);
    expect(response.body.data[0].sku).toEqual(productObject.sku);
  });

  test('POST /product missing required body field', async () => {
    const productObject = {
      description: 'this is description',
    };
    const response = await request(app)
      .post('/product')
      .send(productObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
    expect(response.body.status).toEqual('fail');
  });
});

describe('PUT Product routes', () => {
  test('PUT /product/:id', async () => {
    const productObject = productSampleData[0];
    const product = await ProductModel.create(productObject);
    const response = await request(app)
      .put(`/product/${product._id.toString()}`)
      .send({ description: 'new description' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.description).toEqual('new description');
  });

  test('PUT /product/:id invalid product id', async () => {
    const invalidProductId = 'invalid_product_id';
    await request(app)
      .put(`/product/${invalidProductId}`)
      .send({ name: 'new name' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PUT /product/:id not exist product id', async () => {
    const notExistId = '66d8d38041c908d46609a388';
    await request(app)
      .put(`/product/${notExistId}`)
      .send({ name: 'new name' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});
