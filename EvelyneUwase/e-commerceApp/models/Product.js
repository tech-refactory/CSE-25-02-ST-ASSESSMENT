const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
   productName: {
    type: String,
    trim: true,
   },

   categort: {
    type: String,
   },

   price: {
    type:Number,
   },

   quantity: {
    type: Number,
   },

   color:{
    type: String,
   },

   image:{
    type: String,
   }

}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);
module.export = Product;