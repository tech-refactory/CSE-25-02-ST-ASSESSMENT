//1 Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  });
require("dotenv").config();

//Import user's model
//const Signup = require('./models/SignUp');

//2.Instanciations
const app = express();
const PORT = 3008;

//import routes
const index = require("./routes/indexRoutes");


//3.configuration
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

//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specify the views directory

//4. middleware
//specifies static files
app.use(express.static(path.join(__dirname, "public"))); //It specifies a folder for static files
app.use("/public/imgs/uploads", express.static(__dirname + "/public/imgs/uploads"));
app.use(express.urlencoded({ extended: true })); //helps to parse data from forms

// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
// passport.use(Signup.createStrategy());
// passport.serializeUser(Signup.serializeUser());
// passport.deserializeUser(Signup.deserializeUser());

//5. Routes
//using imported routes
app.use("/", index);


//redirection to unavailable page
app.get("*", (req, res) => {
  res.send("oops! page not found");
});

//6. Bootsrapping a server
//Always the last line in this file
app.listen(PORT, () => console.log(`listening on port ${PORT}`));