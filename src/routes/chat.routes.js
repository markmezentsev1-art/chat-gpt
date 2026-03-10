import express from 'express';
import { ChatConversations, sendMessage } from '../controllers/chat.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/messages', authMiddleware, sendMessage);
router.get('/conversations', authMiddleware, ChatConversations);

export default router;
