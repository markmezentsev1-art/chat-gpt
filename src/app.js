// Connect dotenv to load environment variables from .env

require('dotenv').config();
const { env } = require('./config/env'); // our env validator (NODE_ENV, JWT_SECRET, PORT)
const cors = require('cors');
// Connect express
const express = require('express');
const app = express();

// Allows reading JSON from request body (req.body)
app.use(express.json());
app.use(cors());

// Connect routes
const healthRoutes = require('./routes/health.routes'); // health check
const authRoutes = require('./routes/auth.routes'); // login/registration
const chatRoutes = require('./routes/chat.routes'); // chat endpoints

// ALL endpoints start with /api
app.use('/api', healthRoutes); // GET /api/health
app.use('/api/auth', authRoutes); // POST /api/auth/login (login), POST /api/auth/register (registration)
app.use('/api/chat', chatRoutes); // POST /api/chat/messages (authorized)
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Take port from config (env), so it can be changed via .env
const PORT = Number(env.PORT);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
