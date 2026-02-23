require('dotenv').config();
const OpenAI = require('openai');
const { env } = require('../config/env'); // твоя конфигурация

// Инициализация клиента OpenAI
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY, // ← должен быть в .env или в env
  // organization: env.OPENAI_ORG_ID,  // если нужно, раскомментируй
  // project: env.OPENAI_PROJECT_ID,   // если используешь проекты
});

/**
 * Отправляет сообщение в OpenAI (gpt-4o-mini) и возвращает ответ
 * @param {string} message - текст запроса от пользователя
 * @returns {Promise<string>} ответ модели
 */
async function sendMessageToAI(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1024, // можно изменить по желанию
      temperature: 0.7, // можно убрать или настроить
      top_p: 1,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    return responseText || 'No response from model';
  } catch (error) {
    console.error('OpenAI error:', error.message);

    // Можно сделать более дружелюбные сообщения для разных ошибок
    if (error.code === 'insufficient_quota') {
      throw new Error('Лимит OpenAI исчерпан');
    }
    if (error.code === 'invalid_api_key') {
      throw new Error('Неверный API-ключ OpenAI');
    }

    throw new Error('AI service unavailable');
  }
}

module.exports = { sendMessageToAI };
