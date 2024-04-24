const mongoose = require('mongoose');

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
    date:{
        type: String,
        default: Date.now(),
    }
});

module.exports = mongoose.model('PermissionRequest', PermissionRequestSchema);