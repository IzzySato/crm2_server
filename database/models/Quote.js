const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    jobType: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    openDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    deletedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);