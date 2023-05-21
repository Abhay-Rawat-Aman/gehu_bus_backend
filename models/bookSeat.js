const mongoose = require('mongoose')

const {Schema} = mongoose;
const bookSeatScheme = new Schema({
    student_details:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'StudentDS',
        required:true
    },
    seat_no:{
        type:Number,
        required:true
    }, 
    bus_details:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'ChooseBus',
        required:true
    },
    verify:{
        type:String,
        default:'Not Verify'
    }

})

module.exports = mongoose.model("BookSeat",bookSeatScheme);