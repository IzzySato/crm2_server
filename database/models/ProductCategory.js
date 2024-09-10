const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');
const { MODEL_NAME } = require('../../constants/modelName');

const ProductCategorySchema = new mongoose.Schema({
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
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.COMPABY,
    required: true,
  },
  active: {
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
  ProductCategoryModel: dbConnect().model(
    MODEL_NAME.PRODUCT_CATEGORY,
    ProductCategorySchema
  ),
};
