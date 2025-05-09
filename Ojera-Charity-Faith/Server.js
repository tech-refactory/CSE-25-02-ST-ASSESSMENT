const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });

// Set up Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static data for the dashboard
const dashboardData = {
  sales: 50000000,
  orders: 15000000,
  inStock: 42000000,
  outOfStock: 5,
  products: [
    { id: '#645341', name: 'Sumsang s25+ Ultra', category: 'Smart Phones', price: 6900000, quantity: 981 },
    { id: '#645346', name: 'Gucci XXL Shirt', category: 'Fashion', price: 500000, quantity: 100 },
    { id: '#645342', name: 'XL Zara Shirt', category: 'Fashion', price: 600000, quantity: 56 },
    { id: '#645344', name: 'iPhone 15', category: 'Smart Phones', price: 7900000, quantity: 752 },
    { id: '#645343', name: 'Smart home Curtain', category: 'Interior Design', price: 500000, quantity: 30 },
    { id: '#645345', name: 'Spectrum Laptop 14.6 Inc', category: 'Laptops', price: 15800000, quantity: 144 },
  ]
};

// Route to render the Vendor Dashboard page
app.get('/vendor', (req, res) => {
  res.render('vendor', dashboardData);
});

// Route for the index (example)
app.get('/product', (req, res) => {
  res.json({ message: "Index route is working!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
