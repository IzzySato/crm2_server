const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const User = require('../../../database/models/User');
const { setup } = require('../../../database/test/setup');
const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');

describe('Test Authentication', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);

  test('GET /google', async () => {
    const keys = require('../../../config/keys');
    const { ObjectId } = require('mongodb');
    const newUser = {
      firstName: 'Joe',
      lastName: 'Smith',
      companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
      email: 'joe.smith@gmail.com',
      authProviderId: 'dwdvduwd778721',
      permissions: ['read', 'write'],
      active: true,
    };
    const { _id } = await User.create(newUser);
    const keygrip = new Keygrip([keys.cookieKey]);
    const sessionObject = {
      passport: {
        user: _id.toString(),
      },
    };
    const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
      'base64'
    );
    const sig = keygrip.sign('session=' + sessionString);
    console.log(sessionString, sig);

    // await request(process.env.SERVER_URL).get('/').expect(200).setCookie()
    // await page.setCookie({
    //   name: 'session',
    //   value: sessionString
    // })
    // await page.setCookie({
    //   name: 'session.sig',
    //   value: sig
    // })
    expect(0).toBe(0);
    // TODO
    // const res = await request(process.env.SERVER_URL).get('/');
    // expect(res.statusCode).toBe(200);
  });
});
