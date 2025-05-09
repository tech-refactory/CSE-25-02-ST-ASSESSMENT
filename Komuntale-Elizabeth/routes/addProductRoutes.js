const express = require('express');
const router = express.Router();
const Product = require('../models/AddProduct');

router.get('/addproduct', async (req, res) => {
  const products = await Product.find();
  res.render('addProduct', { products });
});

router.post('/addproduct', async (req, res) => {
  const { productName, category, price, quantity, color } = req.body;

  if (!productName || !category || !price || !quantity || !color) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('Received data:', req.body); // Debugging line to see if the data is correct

  const newProduct = new Product({
    Id: '#' + Math.floor(Math.random() * 1000000),
    Name: productName,
    Category: category,
    price: parseFloat(price),
    Quantity: parseInt(quantity),
    Color: color
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error saving product:', error); // Log the error if any
    res.status(500).json({ message: 'Failed to save product' });
  }
});

module.exports = router;