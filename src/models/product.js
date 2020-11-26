const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    productCode: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mrpPrice: { 
        type: Number, 
        required: true 
    },
    listPrice: { 
        type: Number, 
        required: true 
    },
    makingCost: { 
        type: Number, 
        required: true 
    },
    gst: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    size: { 
        type: String, 
        required: true, 
        trim: true 
    },
    cluster: { 
        type: String, 
        required: true, 
        trim: true 
    },
    artisan: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
