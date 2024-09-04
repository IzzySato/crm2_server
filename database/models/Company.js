const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  addressIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Address',
  },
  phone: {
    type: String,
  },
  tradeType: {
    type: [String],
  },
  availableTags: {
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

module.exports = mongoose.model('Company', CompanySchema);
