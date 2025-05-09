const express = require("express");
const path = require(path);
const mongoose = require("mongoose");
require('dotenv').config();

// imprt models


// import routes


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


// fall back
app.get("/", (req, res) => {
  res.send("Error! Page does not exist.");
});

app.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});