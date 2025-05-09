const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const moment = require("moment");
require("dotenv").config();


const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.locals.moment = moment;

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

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", productRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
