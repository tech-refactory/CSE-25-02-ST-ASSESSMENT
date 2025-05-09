const express = require('express')
const router = express.Router();

const Product = require("../models/Product")

router.get("/addproduct", async (req, res)=>{
    try {
        const products = await Product.find().sort({ date: -1});
        res.render("index", {
           Products: products,
        });
    } catch (error) {
        console.error("Error fetching supplier:", error);
        res.status(500).send("Internal Server Error");
    
    }
});
router.post('/addproduct',async(req, res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        console.log(product)
        res.redirect("/addproduct")


    }catch (error){
        res.status(400).render("/addproduct")
        console.log(error);
    }
});

module.exports = router;