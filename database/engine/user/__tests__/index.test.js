const { describe, expect, test } = require('@jest/globals');
const { findOrCreate, addUser } = require('..');
const { setup } = require('../../../testSetUp/setup');
const { ObjectId } = require('mongodb');

describe('Test User Database Functions', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);

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
  });

  test('add a new user', async () => {
    const user = {
      firstName: 'Joe',
      lastName: 'Smith',
      companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
      email: 'joe.smith@gmail.com',
      authProviderId: 'dwdvduwd778721',
      permissions: ['read', 'write'],
      active: true
    };
    const result = await addUser(user);
    expect(result[0].firstName).toBe('Joe');
    expect(result[0].lastName).toBe('Smith');
    expect(result[0].email).toBe('joe.smith@gmail.com');
  });
});
