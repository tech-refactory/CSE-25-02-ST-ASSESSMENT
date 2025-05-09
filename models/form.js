const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  Category: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  
});
const Form = mongoose.model('Form', formSchema);

module.exports = mongoose.model('Form', FormSchema);