// 1. Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
require("dotenv").config();

const Product = require("./models/Product");


// 2. App Instantiation
const app = express();
const PORT = 3006;

// 3. Routes
const productRoutes = require("./routes/productRoutes");

// 4. Configuration
app.locals.moment = moment;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("MongoDB connection established successfully.");
  })
  .on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 5. Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// 6. Routes
app.use("/", productRoutes);

// 7. Fallback Route
app.get("*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

// 8. Server Startup
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
