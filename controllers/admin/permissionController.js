const Permission = require('../../models/permissionModel');

const { validationResult } = require('express-validator');

const addPermission = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { permission_name } = req.body;

        const isExists = Permission.findOne({ permission_name });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'This Permission is Already Exist!'
            });
        }

        var obj = {
            permission_name
        }

        if (req.body.default) {
            obj.is_default = parseInt(req.body.default);
        }

        const permission = new Permission( obj );
        const newPermission = await permission.save();

        return res.status(200).json({
            success: true,
            msg: 'New Permission Created Successfully!',
            data: newPermission
        });

    } 
    catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

module.exports = {
    addPermission
}