'use strict';
const { describe, expect, test } = require('@jest/globals');
const { getInvitationByEmail, addInvitation } = require('..');
const { setup } = require('../../../test/setup');
const Invitation = require('../../../models/Invitation');
const { invitation } = require('../../../test/testData/invitationData');

describe('Invitation Model', () => {
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

  test('get invitation by email', async () => {
    await Invitation.create(invitation);
    const result = await getInvitationByEmail('test@mail.com');
    expect(result.permissions[0]).toBe('read');
    expect(result.permissions[1]).toBe('write');
  });

  test('add an invitation', async () => {
    const result = await addInvitation(invitation);
    expect(result[0].permissions[0]).toBe('read');
    expect(result[0].permissions[1]).toBe('write');
  });
});
