const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3007;

// Connect to MongoDB
mongoose.connect(process.env.BASE, {});
mongoose.connection
  .on("open", () => {
    console.log("Mongoose is connected");
  })
  .on("error", (err) => {
    console.log(`connection error: ${err.message}`);
  });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', indexRoutes);
app.use('/products', productRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

