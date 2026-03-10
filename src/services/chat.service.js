//import { sendMessageToAI } from '../lib/bedrock.js';

import e from 'express';
import { sendMessageToAI } from '../lib/OpenAi.js';
import {
  createMessage,
  getLastFiveMessages,
} from '../repositories/message.repository.js';

export async function processChat(message, userId) {
  // Save user message to DB
  console.log('USER ID===:', userId);
  await createMessage({
    content: message,
    role: 'user',
    userId, // use the userId from the request
  });
  // Get last 5 messages for context (optional)
  const lastMessages = await getLastFiveMessages(userId);
  const aiResponse = await sendMessageToAI(lastMessages);
  await createMessage({
    content: aiResponse,
    role: 'assistant',
    userId, // use the userId from the request
  });

  return aiResponse;
}
