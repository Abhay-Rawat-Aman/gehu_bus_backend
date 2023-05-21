const mongoose = require('mongoose')
const {Schema} = mongoose;
const driverScheme = new Schema({
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
    licenceno:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    }
})

module.exports = mongoose.model("Driver",driverScheme);