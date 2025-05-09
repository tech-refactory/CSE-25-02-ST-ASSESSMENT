import express from 'express';
import {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Routes
router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;