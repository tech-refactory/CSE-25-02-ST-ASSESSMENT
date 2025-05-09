const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(express.static('public'));
const products = require('./routes/products');

// MongoDB Connection
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
  process.exit(1); 
}
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', productRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});