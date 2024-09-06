'use strict';
const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const {
  setup,
  addUserGetToken,
} = require('../../../../database/testUtils/setup');
const { UserModel } = require('../../../../database/models/User');
const {
  userSampleData,
} = require('../../../../database/testUtils/testData/userDara');
const app = require('../../../../app');

let token = '';

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
  await UserModel.deleteMany({});
});

describe('GET User routes', () => {
  test('GET /user/:id', async () => {
    const userObj = userSampleData[0];
    const user = await UserModel.create(userObj);
    await request(app)
      .get(`/user/${user._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /user/:id not exsist user id', async () => {
    const notExistUserId = '66d8d38041c908d46609a388';
    await request(app)
      .get(`/user/${notExistUserId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });

  test('GET /user/:id invalid user id', async () => {
    const invalidUserId = 'invalid_id';
    await request(app)
      .get(`/user/${invalidUserId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('POST User routes', () => {
  test('POST /user', async () => {
    const userObject = userSampleData[0];
    const response = await request(app)
      .post('/user')
      .send(userObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data[0].firstName).toEqual(userObject.firstName);
    expect(response.body.data[0].lastName).toEqual(userObject.lastName);
  });

  test('POST /user missing required body field', async () => {
    const userObject = {
      lastName: 'lastname',
    };
    const response = await request(app)
      .post('/user')
      .send(userObject)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
    expect(response.body.status).toEqual('fail');
  });
});

describe('PUT User routes', () => {
  test('PUT /user/:id', async () => {
    const userObject = userSampleData[0];
    const user = await UserModel.create(userObject);
    console.log('token', token)
    const response = await request(app)
      .put(`/user/${user._id.toString()}`)
      .send({ lastName: 'new lastName' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.lastName).toEqual('new lastName');
  });

  test('PUT /user/:id invalid user id', async () => {
    const invalidUserId = 'invalid_user_id';
    await request(app)
      .put(`/user/${invalidUserId}`)
      .send({ lastName: 'new lastName' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PUT /user/:id not exist user id', async () => {
    const notExistId = '66d8d38041c908d46609a388';
    await request(app)
      .put(`/user/${notExistId}`)
      .send({ lastName: 'new lastName' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});
