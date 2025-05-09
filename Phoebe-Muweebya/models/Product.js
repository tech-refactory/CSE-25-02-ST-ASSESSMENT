const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const productSchema = new mongoose.Schema({
    product:{
        type:String,
        trim:true,
        required:true,
        
    },

    category:{
        type:String,
        trim:true,
        required:true,

    },
    price: {
        type:Number,
        trim:true,
        required:true,

    },
    quantity:{
        type:Number,
        trim:true,
        required:true,
        

    },
    
    color:{
        type:String,
        trim:true,
        required:true,
        

    },
    image:{
        type:String,
        trim:true,
        required:true,
    },
    


}); 

module.exports = mongoose.model('product', productSchema);