const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Stats = require('../models/stats');

// Main dashboard route
router.get('/', async (req, res) => {
  try {
    // Get products
    const products = await Product.find().sort({ createdAt: -1 });
    
    // Get stats
    const salesValue = await Stats.getSalesValue();
    const ordersValue = await Stats.getOrdersValue();
    const totalValue = await Product.getTotalValue();
    const outOfStockCount = await Product.getOutOfStockCount();
    
    res.render('index', { 
      products, 
      stats: {
        sales: salesValue,
        orders: ordersValue,
        inStock: totalValue,
        outOfStock: outOfStockCount
      }
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).render('error', { message: 'Error loading dashboard' });
  }
});

module.exports = router;