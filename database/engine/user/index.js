const logger = require("../../../lib/logger");
const User = require("../../models/User");
const { getInvitationByEmail } = require("../invitation/__tests__");

const findOrCreate = ({ id, name: { familyName, givenName }, emails }) => {
  try {
    const user = User.findOne({ email: emails[0].value });
    if (user) {
      return user;
    } else {
      const invitation = getInvitationByEmail(emails[0].value);
      const isValid = invitation && invitation.expirationDate > Date.now();
      User.create({
        firstName: givenName,
        lastName: familyName,
        companyId: isValid ? invitation.companyId : null,
        email: emails[0].value,
        authProviderId: id,
        permissions: isValid ? invitation.permissions : null,
        isLocked: !isValid,
        active: isValid
      });
    }
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { findOrCreate }