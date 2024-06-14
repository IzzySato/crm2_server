const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');

describe('Test Authentication', () => {
  test('GET /google', async () => {
    // const newUser = {
    //   id: '',
    //   name: {
    //     familyName: 'test',
    //     givenName: 'test',
    //   },
    //   emails: [
    //     {
    //       value: 'test.test@mail.com',
    //     },
    //   ],
    // };
    // const { _id } = await User.create(newUser);
    // const Buffer = require('safe-buffer').Buffer;
    // const sessionObject = {
    //   passport: {
    //     user: _id.toString()
    //   }
    // };
    // const sessionString = Buffer.from(JSON.stringify(sessionObject));
    expect(0).toBe(0);
    // TODO 
    // const res = await request(process.env.SERVER_URL).get('/');
    // expect(res.statusCode).toBe(200);
  });
});
