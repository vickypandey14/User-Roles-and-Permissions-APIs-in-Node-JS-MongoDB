const Category = require('../models/categoryModel');

const { validationResult } = require('express-validator');

// Add New Category API Method

const addCategory = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { category_name } = req.body;

        const isExists = await Category.findOne({
            name:{
                $regex: category_name,
                $options:'i'
            }
        });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Category Name is already exists.',
            });
        }

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

// Get Categories API Method

const getCategories = async(req, res) => {

    try {

        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            msg: 'All Categories Data Fetched Successfully!',
            data: categories
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Delete Categories API Method


const deleteCategory = async (req, res) => {
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

        const categoryData = await Category.findOne({ _id: id });

        if (!categoryData) {
            return res.status(400).json({
                success: false,
                msg: 'This Category ID does not exist!',
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            msg: 'Category Deleted Successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
}


// Update Category API Method

const updateCategory = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id, category_name } = req.body;

        const existingCategory = await Category.findOne({ name: category_name });
        
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                msg: 'Category with this name already exists!',
            });
        }

        const categoryUpdatedData = await Category.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: category_name
                }
            },
            { new: true }
        );

        if (!categoryUpdatedData) {
            return res.status(400).json({
                success: false,
                msg: 'This Category ID does not exist!',
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Category Data Updated Successfully!',
            data: categoryUpdatedData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

};


module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
};