'use strict';
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { InvitationModel } = require('../../models/Invitation');

/**
 * handleDatabaseOperation is handling errors
 * @param {*} email string email
 * @returns invitation
 */
const getInvitationByEmail = async (email) => {
  return handleDatabaseOperation(
    async () => await InvitationModel.findOne({ email })
  );
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} invitation object
 * @returns array of invitation
 */
const addInvitation = async (invitation) => {
  return handleDatabaseOperation(async () => {
    invitation = Array.isArray(invitation) ? invitation : [invitation];
    return await InvitationModel.insertMany(invitation);
  });
};

module.exports = {
  getInvitationByEmail,
  addInvitation,
};
