import express from 'express';
import { getMetrics } from '../controllers/metricController.js';

const router = express.Router();

// Routes
router.get('/', getMetrics);

export default router;