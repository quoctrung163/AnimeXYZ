const express = require('express');
const controller = require('../controllers/auth.controller');
const authMiddleware = require(`../middleware/auth.middleware`);
const router = express.Router();

router.get('/login', authMiddleware.checkAuth, controller.login);
router.post('/login', authMiddleware.checkAuth, controller.postLogin);

module.exports = router;