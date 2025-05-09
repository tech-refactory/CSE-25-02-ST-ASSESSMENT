const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    // Validate request
    const { name, category, price, quantity, color, imageUrl } = req.body;
    
    // Create product with validated data
    const product = new Product({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      color,
      imageUrl
    });
    
    // Save product
    const savedProduct = await product.save();
    
    // Get updated product list and stats
    const products = await Product.find().sort({ createdAt: -1 });
    const totalValue = await Product.getTotalValue();
    const outOfStockCount = await Product.getOutOfStockCount();
    
    res.status(201).json({
      success: true,
      product: savedProduct,
      products,
      stats: {
        inStock: totalValue,
        outOfStock: outOfStockCount
      }
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ success: false, errors });
    }
    
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;