'use strict';
const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addresses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL_NAME.ADDRESS,
  },
  tags: {
    type: [String],
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

module.exports = {
  CustomerModel: dbConnect().model(MODEL_NAME.CUSTOMER, CustomerSchema)
};
