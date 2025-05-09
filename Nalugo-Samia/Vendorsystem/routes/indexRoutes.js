const express = require('express')
const router = express.Router();

const Product = require("../models/Product")

router.get("/addproduct", (req, res)=>{
    res.render("index")
})
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