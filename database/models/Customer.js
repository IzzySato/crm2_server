const mongoose = require('mongoose');

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
    active: {
        type: Boolean,
    },
    date: {
        type: String,
        default: Date.now(),
    },
});

// case insensitive index
CustomerSchema.index({
    firstName: 1,
    lastName: 1,
    email: 1,
    phone: 1,
    tags: 1,
}, { collation: { locale: 'en', strength: 2 }});

module.exports = mongoose.model('Customer', CustomerSchema);