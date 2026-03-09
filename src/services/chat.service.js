//const { sendMessageToAI } = require('../lib/bedrock');
const { sendMessageToAI } = require('../lib/OpenAi');
const {
  createMessage,
  getLastFiveMessages,
} = require('../repositories/message.repository');

async function processChat(message) {
  // Сохраняем сообщение пользователя в БД
  await createMessage({
    content: message,
    role: 'user',
    // userId: '123', // временный ID, потом будет из JWT
  });
  const aiResponse = await sendMessageToAI(message);
  await createMessage({
    content: aiResponse,
    role: 'assistant',
    // userId: '123', // временный ID, потом будет из JWT
  });
  return aiResponse;
}

module.exports = { processChat };
