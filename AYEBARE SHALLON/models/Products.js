const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    color: String,
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Products', productsSchema);