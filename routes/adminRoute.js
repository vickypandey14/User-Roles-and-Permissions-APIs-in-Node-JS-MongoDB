const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const permissionController = require('../controllers/admin/permissionController');

const { permissionAddValidator } = require('../helpers/adminValidator');

// Authenticated Routes

router.post('/add-permission', auth, permissionAddValidator, permissionController.addPermission);

module.exports = router;