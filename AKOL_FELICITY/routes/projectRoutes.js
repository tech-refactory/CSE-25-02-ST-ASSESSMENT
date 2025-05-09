const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// Import the Phone model
const Phone = require('../models/Phone');

// Image upload configuration
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// Handle GET request to fetch phones
router.get("/Phones", async (req, res) => {
  try {
    let items = await Phone.find().sort({ $natural: -1 }); 
    res.render("project", { phones: items });
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
  }
});




router.post("/Phones", upload.single("image"), async (req, res) => {
  try {
    const phone = new Phone(req.body);
    phone.image =  req.file.path  
    await phone.save();
    res.redirect("/Phones"); 
  } catch (error) {
    console.error("Error saving phone:", error);
    res.status(400).render("project", { error: "Failed to save phone." });
  }
});




 

module.exports = router;
