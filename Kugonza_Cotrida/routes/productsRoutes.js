const express = require('express');
const router = express.Router();
const multer = require('multer');

// import models
const Product = require('../models/Products');

// Uncomment and use if you need file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

router.get('/addProduct', (req, res) => {
  res.render("products");
});

router.post('/addProduct', async (req, res) => {
  try {
    const addProduct = new Product(req.body);
    console.log(addProduct);
    console.log(req.body);
    await addProduct.save();
    res.redirect('/addProduct');
  } catch (error) {
    console.error(error);
    res.status(400).render("products", { error: "Failed to add product" });
  }
});

router.get("/productList", async (req, res) => {
  try {
    const products = await Product.find().sort({ $natural: -1 });
    res.render("productslist", {
      products: products,
    });
  } catch (error) {
    res.status(400).send("unable to find products in the db");
  }
});

module.exports = router; // ✅ EXPORT the router here
