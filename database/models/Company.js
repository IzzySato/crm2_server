const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const CompanySchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  addressIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: MODEL_NAME.ADDRESS,
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

module.exports = {
  CompanyModel: dbConnect().model(MODEL_NAME.COMPABY, CompanySchema),
};
