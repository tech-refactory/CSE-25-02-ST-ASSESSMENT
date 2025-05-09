const express = require('express');
const router = express.Router();
const passport= require('passport');
const requireRole = require('../middleware/roleCheck');


//import models
const Product =require('../models/Forms');


router .get("/",(req, res)=>{
  res.render("Form");
});


router.get("/", (req, res) =>{
    res.render("");
 });
    
 router.post("/", async (req, res) => {
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      return res.status(400).send("");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if(error) {
          throw error;
        }
        res.redirect("/");
      });
    }
    console.log(user);
  } catch (error){
    res.status(400).render("");
    console.log(error);
  } 
});

router.get("/", (req, res) =>{
  res.render("");
});

router.get("/", requireRole(''), (req, res) =>{
  res.render("");
});

router.get("/", (req, res) =>{
  res.render("");
});

router.post("/", 
   passport.authenticate("", {failureRedirect: "/form"}),
   (req,res) =>{
   console.log(req.body);
   req.session.user =req.user;
   if(req.user.role ===""){
       res.redirect("/");
   }
   else if(req.user.role ===""){
       res.redirect("/")
   }
   else if(req.user.role ===""){
       res.redirect("/");
   }else{
       res.send("")
   } 

   router.get("/", (req, res) => {
    if (req.session) {
      req.session.destroy((error) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.redirect("/");
      });
    }
  });

router.get("/", requireRole(''), (req, res) =>{
  res.render("");
});

router.get("/", requireRole(''), (req, res) =>{
  res.render("");
});


});

module.exports = router;