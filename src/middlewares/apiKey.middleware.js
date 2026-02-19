const { env } = require('../config/env');

const checkApiKey = (req, res, next) => {
  const apiKeyFromHeader = req.headers['x-api-key'];

  if (!apiKeyFromHeader) {
    return res.status(401).json({
      success: false,
      message: 'API key missing',
    });
  }

  if (apiKeyFromHeader !== env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key',
    });
  }

  next();
};

module.exports = checkApiKey;
