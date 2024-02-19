const express = require('express');
const router = express();

const authController = require('../controllers/authController');

const { registerValidator } = require('../helpers/validator');

router.post('/register', registerValidator, authController.registerUser);

module.exports = router;