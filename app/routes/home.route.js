const express = require('express');
const controller = require('../controllers/home.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware.checkAuth, controller.index);

module.exports = router;