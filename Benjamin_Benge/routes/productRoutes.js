const express = require("express");
const router = express.Router();
const Product = require("../models/Product");



router.post("/addProduct", async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log("Product with ID:", req.query.id);
    console.log("Data received:", req.body);
    console.log(product)
    await product.save();

    res.redirect("/");
  } catch (error) {
    res.status(400).render("index");
    console.log(error);
  }
});

//getting data from a DB to a table

router.get("/", async (req, res) => {
  try {
    let products = await Product.find().sort({$natural:-1});
    res.render("index", {
      products,



    });
  } catch (error) {
    res.status(400).send("unable to find items in the database");
  }
});
 
  module.exports = router;
