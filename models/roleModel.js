const mongoose = require('mongoose');

const roleSchema = new mongoose.schema({

    role_name:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('Role', roleSchema);