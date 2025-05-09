const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Product = require("./models/Product");

//instantions
const app = express();


//import routes
const productRoutes = require("./routes/productRoutes")

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//testing the connection 
mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });



//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));




app.use('/', productRoutes);

app.listen(3010, () => console.log('Server running on http://localhost:3010'));