const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Render product form and product list
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render("product", { products });
});

// Save new product
router.post("/", upload.single("productImage"), async (req, res) => {
  const { productName, category, price, quantity, color } = req.body;

  try {
    const newProduct = new Product({
      productName,
      category,
      price,
      quantity,
      color,
      productImage: req.file.filename,
    });

    await newProduct.save();
    res.redirect("/products");
  } catch (error) {
    console.error("Failed to save product:", error);
    res.status(500).send("Error saving product");
  }
});

module.exports = router;
