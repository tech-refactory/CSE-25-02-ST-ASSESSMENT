const express = require("express");
const router = express.Router();

// Import model
const AddProduct = require("../models/AddProduct");

// Show Addproduct form
router.get("/AddProduct", (req, res) => {
  res.render("addProduct"); 
});

// ROUTE: Save new product
router.post('/addProduct', async (req, res) => {
    console.log(req.body);
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/Producttable');
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send("Unable to save product to DB");
    }
});

// List all produce sales
router.get("/Producttable", async (req, res) => {
  try {
    // Fetch all products from the database and sort them by most recent
    const Product = await Product.find().sort({ $natural: -1 });
    res.render("producttable", { product }); // Render the list of produce sales
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).send("Unable to retrieve products from the database");
  }
});

module.exports = router;