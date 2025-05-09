const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Form');



router.get("/form", (req, res) => {
  res.render("index", { showSignup: true });
});

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

// Render form page
router.get('/', (req, res) => {
    res.render('index');
});

// Submit product
router.post('/submit', upload.single('image'), async (req, res) => {
    try {
        const product = new Product({
            productName: req.body.productName,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            color: req.body.color,
            image: `/uploads/${req.file.filename}`
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get all products with pagination
router.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments();
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Latest records first
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});




module.exports = router;