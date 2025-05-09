const express = require("express");
const router = express.Router();
const passport = require("passport");
const Product = require("../models/Product");

router.get("/", (req, res) => {
  res.render("product");
});

module.exports = router;