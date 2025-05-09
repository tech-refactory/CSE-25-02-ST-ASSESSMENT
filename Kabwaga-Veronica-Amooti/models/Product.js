const mongoose = require("mongoose");

// Define the schema for Product
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    trim: true,
    required: true,
  }
});

// Export the model for Product
module.exports = mongoose.model("Product", ProductSchema);
