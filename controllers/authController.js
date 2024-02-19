const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        
        const { name, email, password } = req.body;

        const isExistUser = await User.findOne({ email })

        if (isExistUser) {
            return res.status(200).json({
                success: false,
                msg: 'This E-mail is Already Exist!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        const userData = await user.save();

        return res.status(200).json({
            success: true,
            msg: 'User Registered Successfully!',
            data: userData
        });
    } 
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

// Generating the JWT Access Token

const generateAccessToken = async(user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn:"24h" });
    return token;
}

const loginUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: 'E-mail or Password does not match!'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: 'E-mail or Password does not match!'
            });
        }

        const accessToken = await generateAccessToken({ user: userData });

        return res.status(200).json({
            success: true,
            msg: 'You have successfully logged in.',
            accessToken: accessToken,
            tokenType:'Bearer Token',
            data: userData
        });
        
    } 
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

module.exports = {
    registerUser,
    loginUser
}