const { check } = require('express-validator');

exports.createUserValidator = [
    check('name', 'Name is Required.').not().isEmpty(),
    check('email', 'Please Enter a valid E-mail Address').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),

];