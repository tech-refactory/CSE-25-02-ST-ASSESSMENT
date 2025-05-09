const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,

        trim: true
    },
    category: {
        type: String,

        trim: true,
    },
    price: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,

        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    color: {
        type: String,

        trim: true
    },
    image: {
        type: String,

        trim: true
    }
});
module.exports = mongoose.model('Product', productSchema);