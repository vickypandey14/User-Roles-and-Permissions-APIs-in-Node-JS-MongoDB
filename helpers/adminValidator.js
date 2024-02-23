const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name', 'Permission Name is required.').not().isEmpty(),
];

exports.permissionDeleteValidator = [
    check('id', 'Permission ID is required.').not().isEmpty(),
];

exports.permissionUpdateValidator = [
    check('id', 'Permission ID is required.').not().isEmpty(),
    check('permission_name', 'Permission Name is required.').not().isEmpty()
];