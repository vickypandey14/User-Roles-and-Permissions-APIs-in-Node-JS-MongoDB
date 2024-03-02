const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectID,
        ref:'Category',
        required: false
    }],

});

module.exports = mongoose.model('Post', postSchema);