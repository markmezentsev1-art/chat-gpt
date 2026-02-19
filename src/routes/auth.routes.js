const express = require('express');
const { login, register } = require('../controllers/auth.controller');
const apiKeyMiddleware = require('../middlewares/apiKey.middleware');
const router = express.Router();

router.post('/login', login);
router.post('/register', apiKeyMiddleware, register);
module.exports = router;
