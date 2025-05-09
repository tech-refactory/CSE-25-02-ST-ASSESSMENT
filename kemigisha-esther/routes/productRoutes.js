const express = require("express");
const router = express.Router();

router.get("/product", (req, res) => {
    res.render("product");
  });

  router.get('/product', async (req, res) => {
    try {
      const products = await Product.find(); 
      res.render('product', { products });   
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
module.exports = router;