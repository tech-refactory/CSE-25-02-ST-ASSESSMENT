const express = require("express");
const router = express.Router();
const multer =require ("multer")
const path =require("path")
const connectEnsureLogin = require("connect-ensure-login")
//import model
const Phone= require('../models/Phone')

//image upload configs
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, "public/imgs/uploads");
  },
  filename: (req, file, cb) => {
  cb(null, file.originalname);
  },
  });
  var upload = multer({ storage: storage });


router.get("/Phones",async (req, res) => {
  
  res.render("project");
});

router.post("/Phone", upload.single("image"), async (req, res) => {
  try {
    const phone = new Phone(req.body);
    phone.image = req.file.path;
    console.log(phone);
    await phone.save();
    return res.redirect("/Phone"); 
  } catch (error) {
    console.error("Error saving phone:", error);
    return res.status(400).render("phone", { error: "Failed to save phone." });
  }
});
//to list of phonelist
router.get("/phonelist",async(req,res) =>{
  
  try {
     let items= await Phone.find()
     res.render("project",{
       phones:items,
       
     })
   } catch (error) {
   res.status(400).send("unable to find items in the database ")  
   }
 })

 

module.exports = router;
