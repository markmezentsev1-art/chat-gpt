// controllers/chat.controller.js
import { processChat } from '../services/chat.service.js';

/**
 * POST /api/chat/messages
 * Request body: { "message": "Hello" }
 * JWT required in Authorization
 */
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log('user===:', req.user.id);
    // Check that message exists
    const userId = req.user.id;
    if (!message)
      return res.status(400).json({ message: 'Message is required' });

    // Send message to Bedrock
    const aiResponse = await processChat(message, userId);

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
export const ChatConversations = (req, res) => {
  res.status(200).json({ conversationId: '123123123123' });
};
