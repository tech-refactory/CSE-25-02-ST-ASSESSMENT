const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

// GET route to display the add product form and list of products
router.get("/addproduct", async (req, res) => {
  try {
    const products = await Product.find().lean().sort({ _id: -1  });
    const success = req.query.success === 'true';
    const error = req.query.error === 'true';
    res.render("index", { Products: products, success, error });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST route to handle new product submissions
router.post('/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    const products = await Product.find().sort({ _id: -1 });
      res.render('index', { Products: products, success: true });
    res.redirect('/addproduct?success=true');
  } catch (error) {
    console.error('Error saving product:', error);
    res.redirect('/addproduct?error=true');
    const products = await Product.find().sort({ _id: -1 });
      res.status(400).render('index', { Products: products, success: false });
  }
});

module.exports = router;

router.post('/addproduct', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.redirect('/addproduct?success=true');
    } catch (error) {
      console.error('Error saving product:', error);
      res.redirect('/addproduct?error=true');
    }
  });
  
  