const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/health.controller');

// GET /api/healthcheck
router.get('/healthcheck', healthCheck);

module.exports = router;
