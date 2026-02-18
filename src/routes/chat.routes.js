const express = require('express');
const router = express.Router();

const { ChatConversations } = require('../controllers/chat.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller');

router.post('/messages', authMiddleware, chatController.sendMessage);
router.get('/conversations', authMiddleware, ChatConversations);

module.exports = router; // ✅ именно module.exports
