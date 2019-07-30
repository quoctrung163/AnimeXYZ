const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');
const sessionMiddleware = require('../middleware/session.middleware');
const controller = require('../controllers/user.controller');
const validate = require('../validation/user.validate');

let upload = multer({
    dest: './public/uploads/'
});

const router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', authMiddleware.requireAuth, controller.search);

router.get('/create', controller.create);

router.get('/:id', authMiddleware.requireAuth, controller.get);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

module.exports = router;