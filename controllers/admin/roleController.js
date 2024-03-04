const Role = require('../../models/roleModel');

const { validationResult } = require('express-validator');

// Store New Role API Method

const storeRole = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        
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