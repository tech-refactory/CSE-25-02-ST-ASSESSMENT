const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET: render product form with existing products
router.get("/vendor", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("vendor", { products: producs });  // Render 'vendor.pug'
  } catch (err) {
    res.status(500).send("Failed to load products");
  }
});


// POST: handle new product upload
router.post('/vendor', upload.single('image'), async (req, res) => {
  try {
    const { productName, category, price, quantity, color } = req.body;

    if (!productName || !category || !price || !quantity || !color || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newProduct = new Product({
      productName,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      color,
      image: `/uploads/${req.file.filename}`  // Fixed: added proper string concatenation
    });

    await newProduct.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;