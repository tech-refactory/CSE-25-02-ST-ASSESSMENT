//  1. Dependencies
const express =require('express');
const path = require('path');
const mongoose =require('mongoose');
const passport =require('passport')
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  });

require('dotenv').config();

//import user's mode
const Form =require('./models/Form')

// 2.Instantations
const app =express();
const PORT =3004;

//import routes
  const formRoutes =require("./routes/formRoutes");




// 3. Configurations
//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));//specify the views directory

  //app.locals.moment =moment;
  // app.locals.moment = moment;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//testing the connection 
mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });


// 4. middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/img/uploads", express.static(__dirname + "/public/img/uploads"));
app.use(express.urlencoded({ extended: true })); //helps to parse data from forms
// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
// passport.use(Signup.createStrategy());
// passport.serializeUser(Signup.serializeUser());
// passport.deserializeUser(Signup.deserializeUser());



//5.Routes
//using imported routes
 app.use("/", formRoutes);




//6.Bootstraping the server
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));