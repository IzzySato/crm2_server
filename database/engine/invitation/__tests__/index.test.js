'use strict';
const { describe, expect, test } = require('@jest/globals');
const { getInvitationByEmail, addInvitation } = require('..');
const { setup } = require('../../../testSetUp/setup');
const Invitation = require('../../../models/Invitation');
const { invitationSampleData } = require('../../../testSetUp/testData/invitationData');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(() => {
  return new Promise(async (resolve, reject) => {
    try {
      await Invitation.deleteMany({});
      resolve();
    } catch (error) {
      reject(error);
    }
  })
});

describe('Get Invitation', () => {
  test('get invitation by email', async () => {
    await Invitation.create(invitationSampleData);
    const result = await getInvitationByEmail('test@mail.com');
    expect(result.permissions[0]).toBe('read');
    expect(result.permissions[1]).toBe('write');
  });
});

describe('Add Invitation', () => {
  test('add an invitation', async () => {
    const result = await addInvitation(invitationSampleData);
    expect(result[0].permissions[0]).toBe('read');
    expect(result[0].permissions[1]).toBe('write');
  });
});
