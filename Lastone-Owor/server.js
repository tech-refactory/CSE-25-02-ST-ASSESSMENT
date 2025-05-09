require('dotenv').config(); // <--- Load .env variables first
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");

// instastiations
const app = express();
const PORT = 3002;

console.log('MongoDB URI:', process.env.DATABASE);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection
    .on("open", () => {
      console.log("Mongoose connection open");
    })
    .on("error", (err) => {
      console.log(`Connection error: ${err.message}`);
    });

    // import the product routes
    const productRoutes = require('./routes/productRoutes');

    // use the product routes
    app.use('/', productRoutes);


// configurations
app.set("view engine", "pug");  // specify the view engine
app.set("views", path.join(__dirname, "views")); // specifies the view directory

// middleware
app.use(express.urlencoded({ extended: true })); // this helps to parse data to the form
app.use(express.static(path.join(__dirname, "public"))); // this helps to serve static files and specifes a folder for static files


// Passport configuration
app.use(expressSession({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());


// bootstrapping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));