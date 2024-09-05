const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

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
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = NotificationSchema;

module.exports = {
  NotificationModel: dbConnect().model('Notification', NotificationSchema)
};
