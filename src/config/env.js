const { z } = require('zod');

const envSchema = z.object({
  NODE_ENV: z.string().min(1, 'NODE_ENV is required'),

  PORT: z.string().optional().default('3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsed.error.format());
  process.exit(1); // ⛔ остановка сервера
}

module.exports = {
  env: parsed.data,
};