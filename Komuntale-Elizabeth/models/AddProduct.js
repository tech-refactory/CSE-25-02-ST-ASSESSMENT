const mongoose = require('mongoose');

const AddProductSchema = new mongoose.Schema({
    ProductName:{
        type: String,
        trim: true,
    },
    Category:{
        type: String,
        trim: true,
    }

})

module.exports = mongoose.model('AddProduct', AddProductSchema);