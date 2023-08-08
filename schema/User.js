const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        minlength:5
    },
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        default:''
    },
    GitHub:{
        type:String,
        default:''
    }
});

module.exports = {
    userSchema
}