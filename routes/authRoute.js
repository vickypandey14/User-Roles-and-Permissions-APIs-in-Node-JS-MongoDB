const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware'); 

const authController = require('../controllers/authController');

const { registerValidator, loginValidator, updateProfileValidator } = require('../helpers/validator');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

// Authenticated Routes

router.get('/profile', auth, authController.getProfile);
router.post('/update-profile', auth, updateProfileValidator, authController.updateProfile);

module.exports = router;
