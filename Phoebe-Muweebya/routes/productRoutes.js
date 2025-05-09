const express = require("express");
const router = express.Router();

// Import model
const Product = require("../models/Product");

// Add new product form route
router.get("/addProduct", (req, res) => {
  res.render("product");
});

// Submit new product form route
router.post("/addProduct", async (req, res) => { 
  try {
    const newProduct = new Product({
      ...req.body
    });

    await newProduct.save();

    console.log("New product added:", newProduct);
    res.redirect("/productlist");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).render("product", { 
      error: "Failed to add product"
    });
  }
});

// Display list of procured produce
router.get("/productlist", async (req, res) => {
  try {
    const products = await Product.find().sort({ $natural: -1 });

    res.render("product", { 
      procuredProduce: products
    });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(400).render("error", { 
      message: "Unable to find product in the database"
    });
  }
});

module.exports = router;

// Display update product form







