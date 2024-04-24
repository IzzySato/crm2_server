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
  isLocked: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

UserSchema.index({ authProviderId: 1 }, { unique: true });

module.exports = mongoose.model('user', UserSchema);
