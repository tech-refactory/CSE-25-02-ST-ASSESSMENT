const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();

  const sales = products.reduce((acc, p) => acc + (p.price * (1000 - p.quantity)), 0);
  const orders = products.reduce((acc, p) => acc + p.price * (Math.floor(Math.random() * 10)), 0);
  const inStockValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  res.render('product', { products, sales, orders, inStockValue, outOfStock, success: req.query.success });
});

router.post('/add', async (req, res) => {
  const { name, category, price, quantity, color } = req.body;

  if (!name || !category || !price || !quantity || !color) {
    return res.redirect('/');
  }

  await Product.create({ name, category, price, quantity, color });
  res.redirect('/?success=true');
});

module.exports = router;
