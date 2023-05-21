const mongoose = require('mongoose')
const bycrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {Schema} = mongoose;

const studentDSScheme = new Schema({
    student_id:{
        type:Number,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String
    },
    sem:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fees:{
        type:String,
        default:'Not Paid'
    },
    fine:{
        type:String,
        default:'Not Active'
    },
    late_commer:{
        type:Number,
        default:0
    },
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        },
    live:{
        type:Boolean,
        default:false
    }
})

//hlo
studentDSScheme.pre('save',async function (next){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

//compared password
studentDSScheme.methods.comparePassword = async function (enteredPassword)
{
    return await bycrypt.compare(enteredPassword,this.password);
}

//JWT Token
studentDSScheme.methods.getJWTToken = function ()
{
    return jwt.sign(this._id.toString(),process.env.JWT_SECRET);
}


module.exports = mongoose.model("StudentDS",studentDSScheme);