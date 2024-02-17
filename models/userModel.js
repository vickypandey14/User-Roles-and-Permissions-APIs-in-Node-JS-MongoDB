const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0 //0 -> Normal User, 1-> Admin, 2 -> Sub-admin, 3 -> Editor
    },

});

module.exports = mongoose.model('User', userSchema);