const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/index.controller');
// TODO: удалить этот роут, он для примера getData - удалить из всех мест, где используется

// GET /hello?name=Mark
router.get('/hello', getData);

module.exports = router;

