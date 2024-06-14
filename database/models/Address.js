const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  default: {
    type: Boolean,
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

module.exports = mongoose.model('Address', AddressSchema);
