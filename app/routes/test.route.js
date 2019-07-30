const express = require('express');
const controller = require('../controllers/test.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

module.exports = router;