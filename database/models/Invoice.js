const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

const InvoiceSchema = new mongoose.Schema({
  jobType: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  openDate: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
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
  InvoiceModel: dbConnect().model('Invoice', InvoiceSchema),
};
