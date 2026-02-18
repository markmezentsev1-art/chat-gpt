// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    console.log(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// ✅ экспортируем функцию напрямую
module.exports = authenticateJWT;
