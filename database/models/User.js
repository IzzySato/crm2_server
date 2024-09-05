const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  email: {
    type: String,
    required: true,
  },
  authProviderId: {
    type: String,
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
  UserModel: dbConnect().model('User', UserSchema),
};
