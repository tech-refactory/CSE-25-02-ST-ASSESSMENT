const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

// GET route to display the add product form and list of products
router.get("/addproduct", async (req, res) => {
  try {
    const products = await Product.find().lean().sort({ date: -1 });
    res.render("index", { Products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST route to handle new product submissions
router.post('/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/addproduct?success=true');
  } catch (error) {
    console.error('Error saving product:', error);
    res.redirect('/addproduct?error=true');
  }
});

module.exports = router;
