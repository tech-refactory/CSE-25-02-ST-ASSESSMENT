const mongoose = require('mongoose');

const AddProductSchema = new mongoose.Schema({
    ProductName:{
        type: String,
        trim: true,
    },
    Category:{
        type: String,
        trim: true
    },
    Price:{
        type: Number,
        trim: true
    },
    Quantity:{
        type: Number,
        trim: true
    },
    Color:{
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('AddProduct', AddProductSchema);