//defining a schema
const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  pname: {
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
  },
  quantity: {
    type: Number,
    trim: true,
  },
  color: {
    type: String,
    trim: true
  },
  uploadimage: {
    type: String,
    trim: true
  }
  
});

module.exports = mongoose.model("Product", produceSchema);
