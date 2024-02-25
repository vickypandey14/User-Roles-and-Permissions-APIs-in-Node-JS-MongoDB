const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const permissionController = require('../controllers/admin/permissionController');

const { OnlyAdminCanAccess } = require('../middlewares/adminMiddleware');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../helpers/adminValidator');

// Authenticated Routes Starts Here (authorization token needed) -----------

// Permissions Routes

router.post('/add-permission', auth, OnlyAdminCanAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permissions', auth, OnlyAdminCanAccess, permissionController.getPermission);
router.post('/delete-permission', auth, OnlyAdminCanAccess, permissionDeleteValidator, permissionController.deletePermission);
router.post('/update-permission', auth, OnlyAdminCanAccess, permissionUpdateValidator, permissionController.updatePermission);

module.exports = router;