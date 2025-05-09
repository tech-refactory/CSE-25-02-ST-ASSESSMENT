// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  color: String,
  image: String, // image filename or URL
});

module.exports = mongoose.model('Product', productSchema);
