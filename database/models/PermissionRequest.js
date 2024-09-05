const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

const PermissionRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    ref: 'User',
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
    'PermissionRequest',
    PermissionRequestSchema
  ),
};
