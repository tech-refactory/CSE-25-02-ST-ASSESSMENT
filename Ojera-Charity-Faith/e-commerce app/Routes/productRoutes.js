// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    color: req.body.color
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const products = await Product.find();
    const totalSales = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const outOfStock = products.filter(product => product.quantity === 0).length;
    const inStock = products.reduce((sum, product) => sum + product.quantity, 0);

    res.json({
      totalSales,
      outOfStock,
      inStock
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;