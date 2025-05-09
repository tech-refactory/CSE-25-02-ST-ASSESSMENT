const express = require('express');
const router = express.Router(); // ✅ THIS LINE DEFINES `router`

router.get("/Form", (req, res) => {
    console.log("GET /Form hit"); // Optional debug log
    res.render('Form');
});

module.exports = router;