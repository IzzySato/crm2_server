'use strict';
const logger = require('../../../lib/logger');
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { UserModel } = require('../../models/User');
const { getInvitationByEmail } = require('../invitation');


// Google OAuth
const findOrCreate = async ({
  id,
  name: { familyName, givenName },
  emails,
}) => {
  try {
    const user = await UserModel.findOne({ email: emails[0].value });
    if (user) {
      return { userFound: true, user };
    } else {
      const invitation = await getInvitationByEmail(emails[0].value);
      const isValid = invitation && invitation.expirationDate > Date.now();
      const createdUser = await UserModel.create({
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
    throw error;
  }
};

const addUser = async (user) => {
  try {
    user = Array.isArray(user) ? user : [user];
    return await UserModel.insertMany(user);
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const deleteUser = async (_id) => {
  try {
    return await UserModel.deleteOne({ _id })
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} id string user id
 * @returns user with the id
 */
const getUserById = async (id) => {
  return handleDatabaseOperation(async () => await UserModel.findById(id))
};

module.exports = {
  findOrCreate,
  addUser,
  getUserById,
  deleteUser,
 };
