const mongoose = require('mongoose');

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
    type: String,
    default: Date.now(),
  },
  deletedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('user', UserSchema);
