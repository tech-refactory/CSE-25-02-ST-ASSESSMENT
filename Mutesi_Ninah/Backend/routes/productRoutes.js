const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth'); // import auth middleware

// Protected route
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save product' });
  }
});

// Public route
router.get('/all', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

module.exports = router;
