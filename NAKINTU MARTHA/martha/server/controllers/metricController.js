import Product from '../models/Product.js';

// Calculate and return dashboard metrics
export const getMetrics = async (req, res) => {
  try {
    // Get all products
    const products = await Product.find();
    
    // Calculate metrics
    const stockValue = products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
    
    const outOfStockCount = products.filter(product => product.quantity === 0).length;
    
    // In a real application, these would come from order and sales tables
    // For this example, we're providing mock data
    const totalRevenue = 50000000;  // Mock data
    const expectedRevenue = 15000000;  // Mock data
    
    const metrics = {
      totalRevenue,
      expectedRevenue,
      stockValue,
      outOfStockCount
    };
    
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};