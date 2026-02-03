const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/index.controller');

// GET /hello?name=Mark
router.get('/hello', getData);

module.exports = router;

