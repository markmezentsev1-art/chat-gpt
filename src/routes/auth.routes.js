import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import apiKeyMiddleware from '../middlewares/apiKey.middleware.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', apiKeyMiddleware, register);
export default router;
