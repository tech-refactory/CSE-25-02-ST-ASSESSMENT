//1)Dependencies

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

//import user's model

 
//2)instantiations

const app = express();
const PORT = 3003;

//import routes

const productRoutes = require("./routes/productRoutes")


//3)configurations

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

app.set("view engine", "pug"); //specify the engine name
app.set("views", path.join(__dirname, "views")); //specify the views directory

//4)middleware

//specifies folder for static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); //helps to parse data from forms

//5) Routes
//using imported routes
app.use("/", productRoutes);




// 6) Bootstrapping server

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
