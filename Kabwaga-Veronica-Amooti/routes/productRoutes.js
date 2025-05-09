const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET main product dashboard page
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }); // newest first
    res.render('product', { products, success: req.query.success });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to add new product
router.post('/add', async (req, res) => {
  const { productName, category, price, quantity, color } = req.body;

  if (!productName || !category || !price || !quantity) {
    return res.redirect('/');
  }

  try {
    await Product.create({
      productNameame,
      category,
      price: Number(price),
      quantity: Number(quantity),
      color
    });

    res.redirect('/?success=true');
  } catch (err) {
    console.error('Error saving product:', err);
    res.redirect('/');
  }
});

// GET route for fetching products for the frontend table
router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }); // newest at top
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
