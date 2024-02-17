const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    comment: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Comment', commentSchema);