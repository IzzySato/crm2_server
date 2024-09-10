const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  payload: mongoose.Schema.Types.Mixed,
  read: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL_NAME.USER,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.USER,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.COMPABY,
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
  NotificationModel: dbConnect().model(MODEL_NAME.NOTIFICATION, NotificationSchema)
};
