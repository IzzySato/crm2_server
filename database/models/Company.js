const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    businessName:{
        type: String,
        required: true,
    },
    logoImg: {
        data: Buffer,
        contentType: String,
    },
    addressIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Address'
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
    isLocked: {
        type: Boolean,
    },
    date: {
        type:String,
        default:Date.now(),
    },
});

module.exports =  mongoose.model('Company', CompanySchema);