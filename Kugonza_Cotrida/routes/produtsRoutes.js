const express =require('express');
const router = express.Router();
const multer =require('multer')

//import models
const Product =require('../models/Product')

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//     cb(null, "public/img/uploads");
//     },
//     filename: (req, file, cb) => {
//     cb(null, file.originalname);
//     },
//     });
//     var upload = multer({ storage: storage });



router.get('/addProduct',(req,res) =>{
    res.render("products");
});

router.post('/addProduct',  async (req, res) => {
    try {
        const addProduct = new Product(req.body); // Create a new product instance
        console.log(addProduct);
        console.log(req.body)
        await addProduct.save(); // Wait for the product to be saved
        res.redirect('/addProduct'); // Redirect after successful save
    } catch (error) {
        console.error(error);
        res.status(400).render("products", { error: "Failed to add product" }); // Provide error feedback
    }
});


  
// code to get a list of products from the database 
router.get("/productList", async(req,res) =>{
    try {
        const products = await Product.find().sort({$natural:-1});
        res.render("productslist", {
            products:products,
        })
    } catch (error) {
       res.status(400).send("unable to find products in the db") 
    }
  });