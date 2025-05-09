const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/products', require('./routes/productRoutes'));

app.listen(3000, () => console.log('Server running on port 3000'));