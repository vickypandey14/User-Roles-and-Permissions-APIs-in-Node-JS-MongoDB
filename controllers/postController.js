const Post = require('../models/postModel');

const { validationResult } = require('express-validator');


// Create New Post API Method

const createPost = async(req, res) => {

    try {
       
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { title, description } = req.body;

        var obj = {
            title,
            description,
        }

        if (req.body.categories) {
            obj.categories = req.body.categories;
        }

        const post = new Post( obj );

        const postData = await post.save();

        const postCompleteData = await Post.findOne({ _id: postData._id }).populate('categories');

        return res.status(200).json({
            success: true,
            msg: 'Your post has been successfully created.',
            data: postCompleteData
        });

    } 
    catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

};


// Get All Posts API Method

const getPosts = async(req, res) => {

    try {

        const posts = await Post.find({}).populate('categories');

        return res.status(200).json({
            success: true,
            msg: 'All Posts Data Fetched Successfully!',
            data: posts
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}


// Delete Post By ID API Method

const deletePost = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation Error',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        const isExists = await Post.findOne({ _id:id });

        if (!isExists) {

            return res.status(400).json({
                success: false,
                msg: "Post Not Found. Deletion aborted.",
            });
            
        }

        await Post.findByIdAndDelete({ _id:id });


        return res.status(200).json({
            success: true,
            msg: 'Post successfully deleted!',
        });

        
    } catch (error) 
    {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Unable to delete the post.',
            error: error.message,
        });
    }

};


// Update Post Details API Method

const updatePost = async (req, res) => {
    
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation Error',
                errors: errors.array()
            });
        }

        const { id, title, description } = req.body;

        const isExists = await Post.findOne({ _id: id });

        if (!isExists) 
        {
            return res.status(400).json({
                success: false,
                msg: "Post Not Found. Update aborted.",
            });
        }

        var updateObj = {
            title,
            description
        };

        if (req.body.categories) {
            updateObj.categories = req.body.categories;
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            $set: updateObj
        }, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Post Data Updated Successfully!',
            data: updatedPost
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


module.exports = {
    createPost,
    getPosts,
    deletePost,
    updatePost
};