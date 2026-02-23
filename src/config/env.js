const { z } = require('zod');

const envSchema = z.object({
  NODE_ENV: z.string().min(1, 'NODE_ENV is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  PORT: z.string().optional().default('3000'),
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required'),
  AWS_REGION: z.string().min(1, 'AWS_REGION is required'),
  API_KEY: z.string().min(4, 'key is required'),
  OPENAI_API_KEY: z.string().min(4, 'OpenAI API key is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsed.error.format());
  process.exit(1); // ⛔ stop server
}

module.exports = {
  env: parsed.data,
};
