require('dotenv').config();

const express = require('express');
const app = express();

//TODO: prettier неработает, нужно настроить
// чтобы читать JSON из body
app.use(express.json());

// маршруты
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');

// ВСЕ эндпоинты начинаются с /api
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3030;
// TODO: port в конфиг, а не в коде
// дабавь новый роут или ендпоинт POST /chat/messages, который будет получать {"message": "Hello"}  {
//  "conversationId": "abc-123",
//  "message": { "id": "m1", "role": "assistant", "content": "Hi!", "createdAt": "2026-02-02T12:00:00.000Z" }
// } это должен быть авторизированый ендпоинт, нужно отправлять JWT в заголовке Authorization

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

