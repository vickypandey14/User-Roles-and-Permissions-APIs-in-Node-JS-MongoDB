const Post = require('../models/postModel');

const { validationResult } = require('express-validator');


// Create New Post API Method

const createPost = async(req, res) => {

    try {
       
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
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


// Get Post API Method

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


module.exports = {
    createPost,
    getPosts
};