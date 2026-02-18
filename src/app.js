// Подключаем dotenv для загрузки переменных окружения из .env

require('dotenv').config();
const { env } = require('./config/env'); // наш валидатор env (NODE_ENV, JWT_SECRET, PORT)
const cors = require('cors');
// Подключаем express
const express = require('express');
const app = express();

// Позволяет читать JSON из тела запроса (req.body)
app.use(express.json());
app.use(cors());

// Подключаем маршруты
const healthRoutes = require('./routes/health.routes'); // health check
const authRoutes = require('./routes/auth.routes'); // логин/регистрация
const chatRoutes = require('./routes/chat.routes'); // чат эндпоинты

// ВСЕ эндпоинты начинаются с /api
app.use('/api', healthRoutes); // GET /api/health
app.use('/api/auth', authRoutes); // POST /api/auth/login (логин), POST /api/auth/register (регистрация)
app.use('/api/chat', chatRoutes); // POST /api/chat/messages (авторизованный)
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Берём порт из конфига (env), чтобы можно было менять через .env
const PORT = Number(env.PORT);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
