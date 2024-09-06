const { describe, expect, test } = require('@jest/globals');
const { findOrCreate, addUser, getUserById, deleteUser, updateUser } = require('../..');
const { setup } = require('../../../../testUtils/setup');
const { userSampleData } = require('../../../../testUtils/testData/userDara');
const { UserModel } = require('../../../../models/User');

afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await UserModel.deleteMany({});
});

describe('Get User', () => {
  test('get a user by id', async () => {
    const userObject = userSampleData[0];
    const addedUser = await UserModel.create(userObject);
    const result = await getUserById(addedUser._id.toString());
    expect(result.firstName).toBe(addedUser.firstName);
  });
  
  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(getUserById(invalidId)).rejects.toThrow('Invalid ID format');
  });
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
    const userObject = userSampleData[0];
    const result = await addUser(userObject);
    expect(result[0].firstName).toBe(userObject.firstName);
    expect(result[0].lastName).toBe(userObject.lastName);
    expect(result[0].email).toBe(userObject.email);
  });
});

describe('Delete a User', () => {
  test('delete a user', async () => {
    const userObject = userSampleData[0];
    const addedUser = await UserModel.create(userObject);
    const result = await deleteUser(addedUser._id.toString());
    expect(result.deletedCount).toBe(1);
  });
  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(deleteUser(invalidId)).rejects.toThrow(
      'Invalid ID format'
    );
  });
});

describe('Update a User', () => {
  test('update a user', async () => {
    const userObject = userSampleData[0];
    const addedUser = await UserModel.create(userObject);
    expect(addedUser.firstName).toBe('Joe');
    const result = await updateUser(addedUser._id.toString(), { firstName: 'new name'});
    expect(result.firstName).toBe('new name');
  });

  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(updateUser(invalidId, { firstName: 'Test' })).rejects.toThrow(
      'Invalid ID format'
    );
  });
});
