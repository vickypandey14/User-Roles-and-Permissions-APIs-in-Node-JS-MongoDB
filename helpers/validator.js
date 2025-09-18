const { check } = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is Required.').not().isEmpty(),
    check('email', 'Please Enter a valid E-mail Address').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is Required.').not().isEmpty(),
];

exports.loginValidator = [
    check('email', 'Please Enter a valid E-mail Address').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is Required.').not().isEmpty(),
];

exports.updateProfileValidator = [
    check('name', 'Name is Required.').optional().not().isEmpty(),
    check('password', 'Password must be at least 6 characters long.').optional().isLength({ min: 6 }),
];
