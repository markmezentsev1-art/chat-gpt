// controllers/chat.controller.js
const { sendMessageToAI } = require('../services/chat.service');
const prisma = require('../config/prisma');

/**
 * POST /api/chat/messages
 * Тело запроса: { "message": "Hello" }
 * Требуется JWT в Authorization
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    await prisma.user.findMany();

    // Проверяем, что сообщение есть
    if (!message)
      return res.status(400).json({ message: 'Message is required' });

    // Отправляем сообщение в Bedrock
    const aiResponse = await sendMessageToAI(message);

    // Возвращаем ответ клиенту
    res.json({
      conversationId: 'abc-123', // временный ID
      message: {
        id: 'm1',
        role: 'assistant',
        content: aiResponse,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ message: 'AI service unavailable' });
  }
};
exports.ChatConversations = (req, res) => {
  res.status(200).json({ conversationId: '123123123123' });
};
