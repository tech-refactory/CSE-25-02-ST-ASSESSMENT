const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth'); // import auth middleware

// Protected route
app.post('/api/products/add', authenticateToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ error: 'Failed to save product', details: err.message });
  }
});


// Public route
app.get('/api/products/all', async (req, res) => {
  console.log('Fetching all products...');
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;
