const express = require('express');
const app = express();

// Подключаем маршруты с префиксом /api
const healthRoutes = require('./routes/health.routes');
app.use('/api', healthRoutes); // ✅ все маршруты healthRoutes теперь начинаются с /api

// Другие маршруты
// const indexRoutes = require('./routes/index.routes');
// app.use('/api', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

