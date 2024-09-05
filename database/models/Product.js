const mongoose = require('mongoose');
const { dbConnect } = require('../dbConfig');

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
  productType: mongoose.Schema.Types.Mixed,
  pricing: mongoose.Schema.Types.Mixed,
});

module.exports = {
  ProductModel: dbConnect().model('Product', ProductSchema)
};
