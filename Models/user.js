const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
    {
        firstName : {
            type : String,
            require : true,
        },
        lastName : {
            type : String,
            require : true,
        },
        Email : {
            type : String,
            require : true,
            unique : true,
        },
        password : {
            type : String,
            require : true,
        },
        confirmPassword : {
            type : String,
            require : true,
        },
        phone : {
            type : String,
            require : true,
        },
        address : {
            type : String,
            require :true,
        },
        role : {
            type : Number,
            default : 0,
        },
    },
    {
        timestamps : true,
    }
);



const User = mongoose.model("User",userSchema);
module.exports = User;