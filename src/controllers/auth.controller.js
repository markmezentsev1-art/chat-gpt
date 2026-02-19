const authService = require('../services/auth.service');
const { env } = require('../config/env');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Input validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  try {
    // 2. Login logic
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
  // ✅ environment variable check
  // 1. Input validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  await authService.register(email, password);

  res.status(201).json({ status: 'User created' });
};
