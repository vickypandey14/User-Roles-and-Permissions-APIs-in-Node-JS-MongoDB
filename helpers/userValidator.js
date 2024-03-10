const { check } = require('express-validator');

exports.createUserValidator = [
    check('name', 'Name is Required.').not().isEmpty(),
    check('email', 'Please Enter a valid E-mail Address').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),

];

exports.updateUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
    check('name', 'The Name is Required.').not().isEmpty(),
];

exports.deleteUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
]