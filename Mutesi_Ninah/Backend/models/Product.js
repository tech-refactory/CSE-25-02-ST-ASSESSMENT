const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  color: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
