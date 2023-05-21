const mongoose = require('mongoose')

const {Schema} = mongoose;
const fineScheme = new Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'StudentDS',
        required:true
    },
    status:{
        type:String,
        default:'Not Paid'
    }
})

module.exports = mongoose.model("Fine",fineScheme);