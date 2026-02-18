// services/chat.service.js
require('dotenv').config();
const { TextDecoder } = require('util'); // Для преобразования байтов в строку
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime');
const { env } = require('../config/env'); // Берем данные из конфигурации

// Настраиваем клиент AWS Bedrock
const client = new BedrockRuntimeClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Отправляем сообщение в Bedrock
 * @param {string} message
 * @returns {Promise<string>} Ответ AI
 */
async function sendMessageToAI(message) {
  try {
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0', // пример модели
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 10,
        messages: [{ role: 'user', content: message }],
      }),
    });

    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);
    const result = JSON.parse(decoded);

    // Здесь возвращаем текст ответа модели
    return (
      result?.completion || result?.messages?.[0]?.content || 'No response'
    );
  } catch (error) {
    console.error('Bedrock error:', error.message);
    throw new Error('AI service unavailable'); // Можно показывать пользователю дружелюбное сообщение
  }
}

module.exports = { sendMessageToAI };
