const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
addProduct: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  
  price: {
    type: Number,
    trim: true,
    required: true,
  
  },

  quantity:{
type: String,
  },

  branch: {
    type: String,
  },
});


module.exports = mongoose.model("Product", productSchema);
