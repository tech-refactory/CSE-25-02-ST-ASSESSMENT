//1)Dependencies
const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUnitialised: false,
});

//import user's model
// const Signup = require("./models/SignUp");

//2)instantiations
const app = express();
const PORT = 3002;

//Import Routes
const productRoutes = require("./routes/productRoutes");



//3)configurations
app.set("view engine", "pug"); //specify the engine name
app.set("views", path.join(__dirname, "views")); //specify the views directory

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

//4)middleware
//specifies folder for static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //helps to parse data from forms


//routes
app.use("/", productRoutes);

//Boostrapping Server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));