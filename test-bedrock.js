require('dotenv').config();
const { TextDecoder } = require('util');

const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function test() {
  try {
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Hello from Node.js',
          },
        ],
      }),
    });

    const response = await client.send(command);

    const result = JSON.parse(new TextDecoder().decode(response.body));

    console.log('AI RESPONSE:');
    console.log(result);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

test();
