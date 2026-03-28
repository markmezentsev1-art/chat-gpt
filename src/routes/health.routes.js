import express from 'express';
import { healthCheck } from '../controllers/health.controller.js';
const router = express.Router();

// GET /api/healthcheck
router.get('/healthcheck', healthCheck);

export default router;
