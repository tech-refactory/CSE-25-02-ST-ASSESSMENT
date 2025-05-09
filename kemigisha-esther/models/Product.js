const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    price: {
        type: Number, // Changed from String to Number
        trim: true,
    },
    quantity: {
        type: Number,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
