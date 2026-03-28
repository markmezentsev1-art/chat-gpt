// Connect dotenv to load environment variables from .env
import 'dotenv/config';
import { env } from './config/env.js'; // our env validator (NODE_ENV, JWT_SECRET, PORT)
import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health.routes.js'; // health check
import authRoutes from './routes/auth.routes.js'; // login/registration
import chatRoutes from './routes/chat.routes.js'; // chat endpoints

const app = express();

// Allows reading JSON from request body (req.body)
app.use(express.json());
app.use(cors());

// Connect routes (already imported above)

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
