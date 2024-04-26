const Invitation = require("../../../models/Invitation");

const getInvitationByEmail = (email) => {
  return Invitation.findOne({ email });
};

module.exports = {
  getInvitationByEmail,
}