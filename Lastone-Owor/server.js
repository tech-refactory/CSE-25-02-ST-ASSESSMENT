require('dotenv').config(); // <--- Load .env variables first
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

// instastiations
const app = express();
const PORT = 3002;

// import the routes
const productRoutes = require('./routes/productRoutes');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err.message));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// configurations
app.set("view engine", "pug");  // specify the view engine
app.set("views", path.join(__dirname, "views")); // specifies the view directory

// middleware
app.use(express.urlencoded({ extended: true })); // this helps to parse data to the form
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(express.urlencoded({ extended: true })); // this helps to parse data to the form
app.use(express.static(path.join(__dirname, "public"))); // this helps to serve static files and specifes a folder for static files



app.use('/', productRoutes);

// bootstrapping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));