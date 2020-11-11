const mongoose = require('mongoose');
const taxSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    rate: { 
        type: Number, 
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Taxes', taxSchema);