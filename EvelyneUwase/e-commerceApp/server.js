const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
require('dotenv').config();

// imprt models
const Product = require("./models/Product");

// import routes
const vendorRoutes = require("./routes/vendorRoutes");


const app = express();
const port = 5000;

// connect to mongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });


// view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", vendorRoutes )


// fall back


app.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});