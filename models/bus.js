const mongoose = require('mongoose')

const {Schema} = mongoose;
const busScheme = new Schema({
    bus_no:{
        type:String,
        unique:true,
        required:true
    },
    collage_bus_no:{
        type:Number,
        unique:true,
        required:true
    },
    driver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        required:true,
        unique:true
    },
    conductor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Conductor',
        unique:true,
        required:true
    },
    no_of_seats:{
        type:Number,
        required:true
    },
    no_of_students:{
        type:Number
    }
})

module.exports = mongoose.model("Bus",busScheme);