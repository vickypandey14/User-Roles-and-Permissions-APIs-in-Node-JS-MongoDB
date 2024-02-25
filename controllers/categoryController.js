const Category = require('../models/categoryModel');

const { validationResult } = require('express-validator');

// Add New Category API Method

const addCategory = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { category_name } = req.body;

        const category = new Category({
            name: category_name
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success: true,
            msg: 'New Category Created Successfully!',
            data: categoryData
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

};

module.exports = {
    addCategory
};