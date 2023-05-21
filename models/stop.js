const mongoose = require('mongoose')

const {Schema} = mongoose;
const stopScheme = new Schema({
    bus_no:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Bus',
        required:true
    },
    stop_name:{
        type:String,
        required:true
    },
    morning_time:{
        type:String,
        required:true
    },
    evening_time:{
        type:String,
        required:true
    },
    no_of_students:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Stop",stopScheme);