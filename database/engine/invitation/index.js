const Invitation = require("../../models/Invitation");

const getInvitationByEmail = async (email) => {
  return await Invitation.findOne({ email });
};

module.exports = {
  getInvitationByEmail,
}