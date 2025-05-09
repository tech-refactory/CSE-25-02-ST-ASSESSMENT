const express = require('express');
const mongoose = require('mongoose');
const addProductRoutes = require('./routes/addProductRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));


// Use Express' built-in middleware for parsing request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

// Serve static files from the 'public' directory (for CSS, JS, etc.)
app.use(express.static('public'));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Use the routes for adding products
app.use('/', addProductRoutes);

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
