const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  payload: mongoose.Schema.Types.Mixed,
  read: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  deletedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
