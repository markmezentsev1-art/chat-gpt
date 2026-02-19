// controllers/chat.controller.js
const { sendMessageToAI } = require('../services/chat.service');
const prisma = require('../config/prisma');

/**
 * POST /api/chat/messages
 * Request body: { "message": "Hello" }
 * JWT required in Authorization
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    await prisma.user.findMany();

    // Check that message exists
    if (!message)
      return res.status(400).json({ message: 'Message is required' });

    // Send message to Bedrock
    const aiResponse = await sendMessageToAI(message);

    // Return response to client
    res.json({
      conversationId: 'abc-123', // temporary ID
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
