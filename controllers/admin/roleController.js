const Role = require('../../models/roleModel');

const { validationResult } = require('express-validator');

// Store New Role API Method

const storeRole = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { role_name, value } = req.body;

        const existingRole = await Role.findOne({ role_name });

        if (existingRole) {
            return res.status(200).json({
                success: false,
                msg: 'Role with the same name already exists',
            });
        }

        const role = new Role({
            role_name,
            value
        });

        const roleData = await role.save();
        
        return res.status(200).json({
            success: true,
            msg: 'New Role Created Successfully!',
            data: roleData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Get All Roles API Method

const getRoles = async(req, res) => {

    try {

        const roles = await Role.find({
            value: {
                $ne:1
            }
        });

        return res.status(200).json({
            success: true,
            msg: 'All Roles Data Fetched Successfully!',
            data: roles
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

module.exports = {
    storeRole,
    getRoles
}