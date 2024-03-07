const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const createNewUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { name, email } = req.body;

        const isExists = await User.findOne({
            email
        })

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Sorry, This E-mail is already exists!'
            });
        }

        const password = randomstring.generate(8);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        var obj = {
            name,
            email,
            password: hashedPassword
        }

        if (req.body.role && req.body.role == 1) {

            return res.status(400).json({
                success: false,
                msg: 'Creating admin users is not allowed.'
            });

        }
        else if(req.body.role){
            obj.role = req.body.role;
        }

        const newUser = new User( obj );

        const userData = await newUser.save();

        console.log(password);

        return res.status(200).json({
            success: true,
            msg: 'New User Created Successfully!',
            data: userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

module.exports = {
    createNewUser
}