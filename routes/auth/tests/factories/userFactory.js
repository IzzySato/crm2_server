const User = require('../../../../database/models/User');
const { ObjectId } = require('mongodb');

module.exports = async () => {
  const newUser = {
    firstName: 'Joe',
    lastName: 'Smith',
    companyId: new ObjectId('51e0373c6f35bd826f47e9a0'),
    email: 'joe.smith@gmail.com',
    authProviderId: 'dwdvduwd778721',
    permissions: ['read', 'write'],
    active: true,
  };
  return await User.create(newUser);
};