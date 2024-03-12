const Like = require('../models/likeModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');

const { validationResult } = require('express-validator');

// Post Like API Method

const postLike = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                errors: errors.array()
            });
        }

        const { user_id, post_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({
                success: false,
                msg: 'User not found',
                details: 'The specified user does not exist.',
            });
        }

        const postExists = await Post.findById(post_id);
        if (!postExists) {
            return res.status(400).json({
                success: false,
                msg: 'Post not found',
                details: 'The specified post does not exist.',
            });
        }

        const isLiked = await Like.findOne({
            user_id,
            post_id
        });

        if (isLiked) {
            return res.status(400).json({
                success: false,
                msg: 'Post already liked',
                details: 'The user has already liked this post. You cannot like it again.',
            });
        }

        const like = new Like({
            user_id,
            post_id
        });

        const likeData = await like.save();

        return res.status(200).json({
            success: true,
            msg: 'Post liked Successfully',
            data: likeData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Post UnLike API Method

const postUnlike = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                errors: errors.array()
            });
        }

        const { user_id, post_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({
                success: false,
                msg: 'User not found',
                details: 'The specified user does not exist.',
            });
        }

        const postExists = await Post.findById(post_id);
        if (!postExists) {
            return res.status(400).json({
                success: false,
                msg: 'Post not found',
                details: 'The specified post does not exist.',
            });
        }

        const isLiked = await Like.findOneAndDelete({
            user_id,
            post_id
        });

        if (!isLiked) {
            return res.status(400).json({
                success: false,
                msg: 'Post not liked',
                details: 'The user has not liked this post. You cannot unlike it.',
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Post unliked successfully',
            data: isLiked
        });

    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


// Post Like Count API Method


const postLikeCount = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                errors: errors.array()
            });
        }

        const { post_id } = req.body;


        const postExists = await Post.findById(post_id);
        if (!postExists) {
            return res.status(400).json({
                success: false,
                msg: 'Post not found',
                details: 'The specified post does not exist.',
            });
        }

        const likeCount = await Like.find({
            post_id
        }).countDocuments();

        return res.status(200).json({
            success: true,
            msg: 'Total Post Like Counts',
            count: likeCount
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
    postLike,
    postUnlike,
    postLikeCount
};