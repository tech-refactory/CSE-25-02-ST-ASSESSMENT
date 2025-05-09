const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');  


router.get("/product", async (req, res) => {
  try {
    const products = await Product.find(); 
    res.render("product", { products });   
  } catch (error) {
    res.status(400).send("Unable to find items in the db");
  }
});


router.post("/product", async (req, res) => {
  try {
    const { productName, category, price, quantity } = req.body;
    const newProduct = new Product({ productName, category, price, quantity});

    await newProduct.save();
    req.flash('success', 'Product has been added successfully!');
    res.redirect("/product"); 
  } catch (error) {
    res.status(400).send("Unable to save this item to the database");
  }
});

module.exports = router;
