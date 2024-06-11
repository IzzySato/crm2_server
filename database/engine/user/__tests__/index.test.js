const { describe, expect, test } = require('@jest/globals');
const { findOrCreate } = require('..');
const User = require('../../../models/User');
const setupDatabase = require('../../../test/setup');

setupDatabase();

describe('User Model', () => {
  test('create a new user', async () => {
    const newUser = {
      id: '',
      name: {
        familyName: 'test',
        givenName: 'test',
      },
      emails: [
        {
          value: 'test.test@mail.com',
        },
      ],
    };
    const createdUser = await findOrCreate(newUser);
    expect(createdUser.message).toBe('User Created');
    const foundUser = await User.findOne({ email: newUser.emails[0].value });
    expect(foundUser.firstName).toBe('test');
    expect(foundUser.lastName).toBe('test');
  });
});
