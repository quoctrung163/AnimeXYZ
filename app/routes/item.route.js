const express = require('express');

const controller = require('../controllers/item.controller');

const router = express.Router();

router.get('/add/:itemAnimeId', controller.addToCart);

module.exports = router;