const { describe, expect, test } = require('@jest/globals');
const { findOrCreate, addUser } = require('..');
const { setup } = require('../../../testUtils/setup');
const { userSampleData } = require('../../../testUtils/testData/userDara');
const User = require('../../../models/User');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(() => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({});
      resolve();
    } catch (error) {
      reject(error);
    }
  })
});

describe('Add User', () => {
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
    const result = await addUser(userSampleData[0]);
    expect(result[0].firstName).toBe(userSampleData[0].firstName);
    expect(result[0].lastName).toBe(userSampleData[0].lastName);
    expect(result[0].email).toBe(userSampleData[0].email);
  });
});
