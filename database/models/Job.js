const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const JobSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.CUSTOMER,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL_NAME.PRODUCT,
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
  JobModel: dbConnect().model(MODEL_NAME.JOB, JobSchema)
};