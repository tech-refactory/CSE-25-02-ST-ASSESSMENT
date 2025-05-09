const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Submit form data
router.post('/submit', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all records
router.get('/records', async (req, res) => {
    try {
        const records = await Form.find().sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;