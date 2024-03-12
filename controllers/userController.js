const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const { sendMail } = require('../helpers/mailer');


// Create New User API Method

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

        const content = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <p style="font-size: 18px;">Hello ${userData.name},</p>
                
                <p style="font-size: 16px;">Welcome to ByteWebster! Your registration was successful, and your account is now active.</p>

                <p style="font-size: 16px;">Here are your login details:</p>
                
                <ul style="list-style: none; padding: 0; font-size: 16px;">
                    <li><strong>Email:</strong> ${userData.email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>

                <p style="font-size: 16px;">Keep this information secure and do not share it with anyone. If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@example.com" style="color: #007BFF; text-decoration: none;">support@example.com</a>.</p>

                <p style="font-size: 16px;">Thank you for choosing ByteWebster! We look forward to serving you.</p>

                <p style="font-size: 16px;">Best regards,<br>
                ByteWebster Team</p>
            </div>
        `;

        sendMail(userData.email, 'Your registration was successful, and your account is now active.', content);

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

// Get All Users API Method

const getUsers = async(req, res) => {

    try {

        // console.log(req.user._id);

        const users = await User.find({
            _id: {
                $ne: req.user._id
            }
        });

        return res.status(200).json({
            success: true,
            msg: 'Users Data Fetched Successfully',
            data: users
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Update User Data API Method

const updateUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id, name } = req.body;

        const isExists = await User.findOne({
            _id: id
        });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Sorry, This user does not exist!'
            });
        }

        var updateObj = {
            name
        }

        if (req.body.role != undefined) {
            updateObj.role = req.body.role;
        }

        const userUpdatedData = await User.findByIdAndUpdate({ _id:id },{
            $set: updateObj
        }, { new:true });

        return res.status(200).json({
            success: true,
            msg: 'User Data Updated Successfully!',
            data: userUpdatedData
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Delete User API Method

const deleteUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        const isExists = await User.findOne({
            _id: id
        });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: 'User Not Found.',
            });
        }

        await User.findByIdAndDelete({
            _id: id
        });

        return res.status(200).json({
            success: true,
            msg: 'User Record Deleted Succcessfully!',
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
    
}

module.exports = {
    createNewUser,
    getUsers,
    updateUser,
    deleteUser
}