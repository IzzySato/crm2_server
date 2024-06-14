const logger = require('../../../lib/logger');
const User = require('../../models/User');
const { getInvitationByEmail } = require('../invitation');

// Google OAuth
const findOrCreate = async ({
  id,
  name: { familyName, givenName },
  emails,
}) => {
  try {
    const user = await User.findOne({ email: emails[0].value });
    if (user) {
      return { userFound: true, user };
    } else {
      const invitation = await getInvitationByEmail(emails[0].value);
      const isValid = invitation && invitation.expirationDate > Date.now();
      const createdUser = await User.create({
        firstName: givenName,
        lastName: familyName,
        companyId: isValid ? invitation.companyId : null,
        email: emails[0].value,
        authProviderId: id,
        permissions: isValid ? invitation.permissions : null,
        isLocked: !isValid,
        active: isValid,
      });
      return { message: 'User Created', user: createdUser };
    }
  } catch (error) {
    logger.error(error.toString());
  }
};

const addUser = async (user) => {
  try {
    user = Array.isArray(user) ? user : [user];
    return await User.insertMany(user);
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = {
  findOrCreate,
  addUser,
 };
