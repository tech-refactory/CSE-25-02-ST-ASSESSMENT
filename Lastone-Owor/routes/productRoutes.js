// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  const totalSales = 50000000;
  const totalOrders = 15000000;
  const inStock = 42000000;
  const outOfStock = 5;

  res.render('dashboard', {
    products,
    stats: { totalSales, totalOrders, inStock, outOfStock },
  });
});

router.post('/add-product', async (req, res) => {
  const { name, category, price, quantity, color } = req.body;

  if (!name || !category || !price || !quantity || !color) {
    return res.status(400).json({ message: 'All fields required' });
  }

  await Product.create({ name, category, price, quantity, color });
  res.status(200).json({ message: 'Product added' });
});

module.exports = router;
