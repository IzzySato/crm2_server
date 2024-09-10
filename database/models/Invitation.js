const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const InvitationSchema = new mongoose.Schema({
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.USER,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.COMPABY,
    required: true,
  },
  permissions: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = {
  InvitationModel: dbConnect().model(MODEL_NAME.INVITATION, InvitationSchema)
};
