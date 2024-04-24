const mongoose = require('mongoose');

/**
 * example
 * name: prime, work, etc.
 * line1: 123 main street
 * line2: optional
 * city: Vancouver
 * province: BC
 * postcode: V3J 1G8
 * active: true / false -> if active: false, not display
 * default: true / false -> if default: true, used for display
 */

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
});

module.exports = mongoose.model('Address', AddressSchema);
