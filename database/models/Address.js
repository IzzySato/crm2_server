const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

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
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = {
  AddressModel: dbConnect().model(MODEL_NAME.ADDRESS, AddressSchema)
};
