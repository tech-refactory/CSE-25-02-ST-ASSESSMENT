const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');

//instantions
const app = express();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  next();
});


const Product = require("./models/Product");





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

app.listen(3012, () => console.log('Server running on http://localhost:3012'));