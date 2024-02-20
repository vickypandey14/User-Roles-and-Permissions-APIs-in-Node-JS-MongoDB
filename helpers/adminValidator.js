const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name', 'Permission Name is required.').not().isEmpty(),
];