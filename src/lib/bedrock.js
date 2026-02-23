require('dotenv').config();
const { TextDecoder } = require('util'); // For converting bytes to string
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime');
const { env } = require('../config/env'); // Get data from configuration

// Set up AWS Bedrock client
const client = new BedrockRuntimeClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Send message to Bedrock
 * @param {string} message
 * @returns {Promise<string>} AI response
 */
async function sendMessageToAI(message) {
  try {
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0', // example model
      // example model
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 100,
        messages: [{ role: 'user', content: message }],
      }),
    });

    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);
    const result = JSON.parse(decoded);
    console.log('Bedrock raw response:', result.completion);
    // Here we return the model's response text
    return result.content[0].text || 'No response from model';
  } catch (error) {
    console.error('Bedrock error:', error.message);
    throw new Error('AI service unavailable'); // You can show a user-friendly message
  }
}

module.exports = { sendMessageToAI };
