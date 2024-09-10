'use strict';

const { ObjectId } = require('mongodb');

const authTokenUser = {
  firstName: 'Molly',
  lastName: 'P',
  companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
  email: 'molly.p@gmail.com',
  authProviderId: 'dwdvduwd778721',
  permissions: ['read', 'write'],
  active: true,
};

const userSampleData = [
  {
    firstName: 'Joe',
    lastName: 'Smith',
    companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
    email: 'joe.smith@gmail.com',
    authProviderId: 'dwdvduwd778721',
    permissions: ['read', 'write'],
    active: true,
  },
  {
    firstName: 'Alice',
    lastName: 'Brown',
    companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
    email: 'alice.brown@gmail.com',
    authProviderId: '992726711',
    permissions: ['read', 'write'],
    active: true,
  },
];

module.exports = {
  authTokenUser,
  userSampleData,
};
