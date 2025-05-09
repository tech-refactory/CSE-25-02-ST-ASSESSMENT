import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import metricRoutes from './routes/metricRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use default connection string for development
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor-dashboard';
    
    // Log a different message if using default connection
    if (!process.env.MONGODB_URI) {
      console.log('No MongoDB URI provided in environment variables. Using local MongoDB connection.');
      console.log('Please set the MONGODB_URI environment variable when ready to connect to your MongoDB database.');
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/products', productRoutes);
app.use('/api/metrics', metricRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  // Don't crash the server
});