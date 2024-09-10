const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  categoryTags: {
    type: [String],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
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
  productType: mongoose.Schema.Types.Mixed,
  pricing: mongoose.Schema.Types.Mixed,
});

module.exports = {
  ProductModel: dbConnect().model(MODEL_NAME.PRODUCT, ProductSchema)
};
