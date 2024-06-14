const { describe, expect, test } = require('@jest/globals');
const { getInvitationByEmail, addInvitation } = require('..');
const { setup } = require('../../../test/setup');
const { ObjectId } = require('mongodb');
const Invitation = require('../../../models/Invitation');

describe('Invitation Model', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);

  const invitation = {
    invitedBy: new ObjectId('6348acd2e1a47ca32e79f46f'),
    email: 'test@mail.com',
    expirationDate: new Date().toDateString(),
    companyId: new ObjectId('5063114bd386d8fadbd6b004'),
    permissions: ['read', 'write']
  };

  test('get invitation by email', async () => {
    await Invitation.create(invitation)
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
