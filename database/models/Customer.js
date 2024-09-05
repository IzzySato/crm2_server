'use strict';
const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

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
    ref: 'Address',
  },
  tags: {
    type: [String],
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

module.exports = {
  CustomerModel: dbConnect().model('Customer', CustomerSchema)
};
