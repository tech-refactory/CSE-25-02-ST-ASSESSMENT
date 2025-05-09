// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  quantity: String,
  color: String,
  imageUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
