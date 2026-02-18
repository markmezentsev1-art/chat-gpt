const authService = require('../services/auth.service');
const { env } = require('../config/env');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Проверка входных данных
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  try {
    // 2. Логика логина
    const token = await authService.login(email, password);

    return res.json({
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(env.API_KEY); // ✅ проверка переменной окружения
  // 1. Проверка входных данных
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }
  res.status(200).json({ status: 'OK' });
};
