const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Permission = require('../models/permissionModel');

const UserPermission = require('../models/userPermissionModel');

// Register New User API Method
const registerUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        
        const { name, email, password } = req.body;
        const isExistUser = await User.findOne({ email });

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
            password: hashedPassword
        });

        const userData = await user.save();

        // Assigning the Default Permissions to created User
        const defaultPermissions = await Permission.find({ is_default: 1 });

        if (defaultPermissions.length > 0) {
            const PermissionArray = [];
            defaultPermissions.forEach(permission => {
                PermissionArray.push({
                    permission_name: permission.permission_name,
                    permission_value: [0, 1, 2, 3]
                });
            });

            const userPermission = new UserPermission({
                user_id: userData._id,
                permissions: PermissionArray
            });

            await userPermission.save();
        }

        return res.status(200).json({
            success: true,
            msg: 'User Registered Successfully!',
            data: userData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Generating the JWT Access Token
const generateAccessToken = async(user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "24h" });
    return token;
};

// Login User API Method
const loginUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
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

        // Fetch User Data with all the assigned permissions
        const result = await User.aggregate([
            { $match: { email: userData.email } },
            {
                $lookup: {
                    from: "userpermissions",
                    localField: "_id",
                    foreignField: "user_id",
                    as: 'permissions'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    permissions: {
                        $cond: {
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: [ "$permissions", 0 ] },
                            else: null
                        }
                    }
                }
            },
            {
                $addFields: {
                    "permissions": {
                        "permissions": "$permissions.permissions"
                    }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            msg: 'You have successfully logged in.',
            accessToken: accessToken,
            tokenType: 'Bearer Token',
            data: result[0]
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Get User Profile Method API
const getProfile = async(req, res) => {
    try {
        const user_id = req.user._id;
        const userData = await User.findOne({ _id: user_id });

        return res.status(200).json({
            success: true,
            msg: 'Profile data retrieved successfully',
            data: userData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Update User Profile API Method
const updateProfile = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation Error',
                errors: errors.array()
            });
        }

        const user_id = req.user._id;
        const { name, password } = req.body;

        const updateObj = {};
        if (name) updateObj.name = name;
        if (password) updateObj.password = await bcrypt.hash(password, 15);

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $set: updateObj },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                msg: 'User Not Found. Update aborted.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Profile updated successfully!',
            data: updatedUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};
