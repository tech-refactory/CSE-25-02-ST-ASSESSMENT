const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/', async (req, res) => {
  const products = await Product.find();

  const sales = products.reduce((acc, p) => acc + (p.price * (1000 - p.quantity)), 0); // Fake sold quantity
  const orders = products.reduce((acc, p) => acc + p.price * (Math.floor(Math.random() * 10)), 0); // Dummy
  const inStockValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  res.render('product', { products, sales, orders, inStockValue, outOfStock });
});

router.post('/add', async (req, res) => {
  const { name, category, price, quantity, color } = req.body;
  await Product.create({ name, category, price, quantity, color });
  res.redirect('/');
});

module.exports = router;
