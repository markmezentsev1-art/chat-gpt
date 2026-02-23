const { sendMessageToAI } = require('../lib/bedrock');

async function processChat(message) {
  const aiResponse = await sendMessageToAI(message);

  return aiResponse;
}

module.exports = { processChat };
