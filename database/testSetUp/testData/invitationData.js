'use strict';

const { ObjectId } = require('mongodb');

const invitationSampleData = [
  {
    invitedBy: new ObjectId('6348acd2e1a47ca32e79f46f'),
    email: 'test@mail.com',
    expirationDate: new Date().toDateString(),
    companyId: new ObjectId('5063114bd386d8fadbd6b004'),
    permissions: ['read', 'write'],
  },
];

module.exports = {
  invitationSampleData,
};
