//1.Dependencies
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

//import users model (assuming your user model is in models/User.js and uses passport-local-mongoose)
const User = required("./models/form");

//2. instantiations
const app = express();
const PORT = 3100;

//import routes
const productRoutes = require("./routes/productRoutes");

//3. configurations
//setting up how it should connect(connecting to what is in your .env file)
app.locals.moment = moment;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//testing the connection
mongoose.connection
    .on("open", () => {
        console.log("Mongoose connection open");
    })
    .on("error", (err) => {
        console.log(`Connection error: ${err.message}`);
    });

//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//4.middleware
app.use(express.static(path.join(__dirname, "public"))); //specifies a folder for static files
app.use(express.urlencoded({ extended: true })); //this helps to parse data from the form

// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//5. routes
//using imported routes
app.use("/", productRoutes);

//redirection to unavailable page
app.get("*", (req, res) => {
    res.send("oops! page not found");
});

//6. bootstraping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));