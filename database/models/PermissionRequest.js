const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const PermissionRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.USER,
    required: true,
  },
  permissionRequested: {
    type: [String],
  },
  state: {
    type: String,
  },
  approvingUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.USER,
  },
  dateActioned: {
    type: String,
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

module.exports = PermissionRequestSchema;

module.exports = {
  PermissionRequestModel: dbConnect().model(
    MODEL_NAME.PERMISSION_REQUEST,
    PermissionRequestSchema
  ),
};
