'use strict';
const logger = require('../../../lib/logger');
const Invitation = require('../../models/Invitation');

const getInvitationByEmail = async (email) => {
  try {
    return await Invitation.findOne({ email });
  } catch (error) {
    logger.error(error.toString());
  }
};

const addInvitation = async (invitation) => {
  try {
    invitation = Array.isArray(invitation) ? invitation : [invitation];
    return await Invitation.insertMany(invitation);
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = {
  getInvitationByEmail,
  addInvitation,
};
