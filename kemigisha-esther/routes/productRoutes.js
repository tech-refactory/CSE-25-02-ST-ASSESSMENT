const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.get("/product", async(req,res) => {
    try {
      const products = await Product.findOne({_id:req.params.id})
      res.render("product",{products});
    } catch (error){
      res.status(400).send("unable to find this item in the db")
    }
    
    })
    
    router.post("/product", async(req,res) =>{
      try {
        const { productName, category, price, quantity, color, image } = req.body;
        const newProduct = new Product({ productName, category, price, quantity, color, image });
    
        await newProduct.save();
        res.redirect("/product")
      } catch (error) {
        res.status(400).send("unable to find this item in the database")
      }
    })
  
module.exports = router;