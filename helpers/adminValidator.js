const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name', 'The Permission Name is required.').not().isEmpty(),
];

exports.permissionDeleteValidator = [
    check('id', 'The Permission ID is required.').not().isEmpty(),
];

exports.permissionUpdateValidator = [
    check('id', 'The Permission ID is required.').not().isEmpty(),
    check('permission_name', 'The Permission Name is required.').not().isEmpty()
];

exports.addCategoryValidator = [
    check('category_name', 'The Category Name is required.').not().isEmpty(),
];

exports.categoryDeleteValidator = [
    check('id', 'The Category ID is required.').not().isEmpty(),
];

exports.updateCategoryValidator = [
    check('id', 'The Category ID is required.').not().isEmpty(),
    check('category_name', 'The Category Name is required.').not().isEmpty(),
];

exports.createPostValidator = [
    check('title', 'The Post Title is required.').not().isEmpty(),
    check('description', 'The Post Description is required.').not().isEmpty(),
];

exports.postDeleteValidator = [
    check('id', 'The Post ID is required.').not().isEmpty(),
];

exports.updatePostValidator = [
    check('id', 'The Post ID is required.').not().isEmpty(),
    check('title', 'The Post Title is required.').not().isEmpty(),
    check('description', 'The Post Description is required.').not().isEmpty(),
];

exports.storeRoleValidator = [
    check('role_name', 'The Role Name is required.').not().isEmpty(),
    check('value', 'The Role Value is required.').not().isEmpty(),
];