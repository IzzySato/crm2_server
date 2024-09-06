'use strict';
const { describe, expect, test } = require('@jest/globals');
const { getInvitationByEmail, addInvitation } = require('../..');
const { setup } = require('../../../../testUtils/setup');
const {
  invitationSampleData,
} = require('../../../../testUtils/testData/invitationData');
const { InvitationModel } = require('../../../../models/Invitation');

afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await InvitationModel.deleteMany({});
});

describe('Get Invitation', () => {
  test('get invitation by email', async () => {
    const invitationObject = invitationSampleData[0];
    await InvitationModel.create(invitationObject);
    const result = await getInvitationByEmail(invitationObject.email);
    expect(result.permissions[0]).toBe(invitationObject.permissions[0]);
    expect(result.permissions[1]).toBe(invitationObject.permissions[1]);
  });

  test('Return null get invitation by email by not exist email', async () => {
    const invalidEmail = 'invalidemail.com';
    const result = await getInvitationByEmail(invalidEmail);
    expect(result).toBeNull();
  });
});

describe('Add Invitation', () => {
  test('add an invitation object', async () => {
    const invitationObject = invitationSampleData[0];
    const result = await addInvitation(invitationObject);
    expect(result[0].permissions[0]).toBe(invitationObject.permissions[0]);
    expect(result[0].permissions[1]).toBe(invitationObject.permissions[1]);
  });
  test('add invitation Array', async () => {
    const invitationArray = invitationSampleData;
    const result = await addInvitation(invitationArray);
    expect(result.length).toBe(1);
  });
});
