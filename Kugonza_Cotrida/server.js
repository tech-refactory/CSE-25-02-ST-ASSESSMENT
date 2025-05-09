//Dependencies

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
require("dotenv").config();



//Intatiations

const app = express();

const PORT = 3000;



const productsRoutes = require("./routes/productsRoutes");




app.locals.moment = moment;

//configurations

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

//middle ware

app.use(express.static(path.join(__dirname, "public"))); //specifies a folder for static files

app.use(express.urlencoded({ extended: true }));


//routes

app.use("/", productsRoutes);




//redirection to unavailable page

app.get("*url", (req, res) => {
  res.send("oops! page not found");
});

//Bootstrapping Server

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
