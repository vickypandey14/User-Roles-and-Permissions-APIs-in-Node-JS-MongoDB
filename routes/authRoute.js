const express = require('express');
const router = express();

const authController = require('../controllers/authController');

const { registerValidator, loginValidator } = require('../helpers/validator');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

module.exports = router;