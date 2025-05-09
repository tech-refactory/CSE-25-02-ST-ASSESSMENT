// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerce-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});