const mongoose = require('mongoose')
const bycrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const {Schema} = mongoose;
const conductorScheme = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    contactno:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    aadharno:{
        type:Number,
        required:true,
        unique:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    busAssign:{
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
conductorScheme.pre('save',async function(next){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

//compared password
conductorScheme.methods.comparePassword = async function (enteredPassword)
{
    return await bycrypt.compare(enteredPassword,this.password);
}

//JWT Token
conductorScheme.methods.getJWTToken = function ()
{
    return jwt.sign(this._id.toString(),process.env.JWT_SECRET);
}

module.exports = mongoose.model("Conductor",conductorScheme);