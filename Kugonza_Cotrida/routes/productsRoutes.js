const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// GET: Render dashboard with all products
router.get('/addProduct', async (req, res) => {
  try {
    const products = await Product.find().sort({ $natural: -1 }).lean();
    res.render("dashboard", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error loading dashboard.");
  }
});

// POST: Add new product to DB
router.post('/addProduct', async (req, res) => {
  try {
    const { productName, category, price, quantity, color, image } = req.body;

    // Create and save product
    const newProduct = new Product({
      productName: productName,
      category,
      price,
      quantity,
      color,
      image
    });

    await newProduct.save();
    res.redirect('/addProduct');
  } catch (error) {
    console.error(error);
    res.status(400).render("dashboard", { error: "Failed to add product" });
  }
});



module.exports = router;


