const express = require('express');
const router = express.Router();

const { ChatConversations } = require('../controllers/chat.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const { sendMessage } = require('../controllers/chat.controller');

router.post('/messages', authMiddleware, sendMessage);
router.get('/conversations', authMiddleware, ChatConversations);

module.exports = router; // ✅ exactly module.exports
