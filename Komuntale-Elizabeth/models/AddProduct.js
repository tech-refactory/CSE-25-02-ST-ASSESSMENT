const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Id: String,
  Name: String,
  Category: String,
  price: Number,
  Quantity: Number,
  Color: String
});

module.exports = mongoose.model('Product', productSchema);
