const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Import Product model
const Product = require("../models/Product");

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/**
 * GET /
 * Redirect to /product
 */
router.get("/", (req, res) => {
  res.redirect("/product");
});

/**
 * GET /product
 * Render form and product list (all in product.pug)
 */
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find().sort({ $natural: -1 });
    res.render("product", { products });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(400).render("error", {
      message: "Unable to fetch products from the database"
    });
  }
});

/**
 * POST /addProduct
 * Handle new product submission
 */
router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await newProduct.save();
    console.log("New product added:", newProduct);
    res.redirect("/product");
  } catch (error) {
    console.error("Error adding product:", error);
    const products = await Product.find().sort({ $natural: -1 }); // include products for re-render
    res.status(400).render("product", {
      error: "Failed to add product",
      products
    });
  }
});

module.exports = router;


// Display update product form







