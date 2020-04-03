const express = require('express');
const checkAuthMiddleware = require('../app/Http/Middleware/check-auth');
const router = express.Router();

const userController = require('../app/Http/Controllers/UserController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/attach-source', checkAuthMiddleware, userController.attachNewsSource);

module.exports = router