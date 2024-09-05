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
    const invitationArray = invitationSampleData;
    await InvitationModel.create(invitationArray);
    const result = await getInvitationByEmail('test@mail.com');
    expect(result.permissions[0]).toBe('read');
    expect(result.permissions[1]).toBe('write');
  });
});

describe('Add Invitation', () => {
  test('add an invitation', async () => {
    const invitationArray = invitationSampleData;
    const result = await addInvitation(invitationArray);
    expect(result[0].permissions[0]).toBe('read');
    expect(result[0].permissions[1]).toBe('write');
  });
});
