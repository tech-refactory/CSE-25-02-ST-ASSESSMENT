const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
require('dotenv').config();

// Import models
//const Product = require("./models/Product");  // Only keep this line

// Import routes
const productRoutes = require("./Routes/productRoutes");

const app = express();
const port = 5000;

// Connect to MongoDB
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

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", productRoutes);

// Fall back for any other route (optional)
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
