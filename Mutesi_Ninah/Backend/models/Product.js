const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  color: String,
  image: { type: String, match: /^https?:\/\/.*\.(jpeg|jpg|png|gif)$/ }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);