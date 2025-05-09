const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { productName, category, price, quantity, color } = req.body;
    if (!productName || !category || !price || !quantity || !color || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const product = new Product({
      name: productName,
      category,
      price: Number(price),
      quantity: Number(quantity),
      color,
      imageUrl: `/uploads/${req.file.filename}`
    });

    await product.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
