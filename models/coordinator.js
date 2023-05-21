const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {Schema} = mongoose;
const coordinatorScheme = new Schema({
    conductor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Conductor',
        unique:true
    }
})

//JWT Token
coordinatorScheme.methods.getJWTToken = function ()
{
    return jwt.sign(this._id.toString(),process.env.JWT_SECRET);
}

module.exports = mongoose.model("Coordinator",coordinatorScheme);