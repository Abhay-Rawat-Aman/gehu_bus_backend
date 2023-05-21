const mongoose = require('mongoose')
const {Schema} = mongoose;


const adminScheme = new Schema({
    name:{
        type:String,
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
    }
});

//hlo
adminScheme.pre('save',async function (next){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

//compared password
adminScheme.methods.comparePassword = async function (enteredPassword)
{
    return await bycrypt.compare(enteredPassword,this.password);
}

//JWT Token
adminScheme.methods.getJWTToken = function ()
{
    return jwt.sign(this._id.toString(),process.env.JWT_SECRET);
}

module.exports = mongoose.model("Admin",adminScheme);