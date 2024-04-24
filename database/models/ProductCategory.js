const mongoose = require('mongoose');

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
      ref: 'Company',
      required: true,
    },
    active: {
      type: Boolean,
    },
    date:{
        type: String,
        default: Date.now(),
    }
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);