const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');  // Make sure you import your Product model

// GET route to fetch all products
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find(); // Use find() to get all products
    res.render("product", { products });   // Pass the products to the template
  } catch (error) {
    res.status(400).send("Unable to find items in the db");
  }
});

// POST route to add a new product
router.post("/product", async (req, res) => {
  try {
    const { productName, category, price, quantity, color, image } = req.body;
    const newProduct = new Product({ productName, category, price, quantity, color, image });

    await newProduct.save();
    res.redirect("/product"); 
  } catch (error) {
    res.status(400).send("Unable to save this item to the database");
  }
});

module.exports = router;
