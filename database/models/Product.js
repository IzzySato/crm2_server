const mongoose = require('mongoose');

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
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  productType: mongoose.Schema.Types.Mixed,
  pricing: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Product', ProductSchema);
