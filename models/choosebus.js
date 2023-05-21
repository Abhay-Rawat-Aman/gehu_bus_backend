const mongoose = require('mongoose')
const {Schema} = mongoose;

const chooseBusScheme = new Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'StudentDS',
        required:true,
        unique:true
    },
    bus:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Bus',
        required:true
    },
    stop:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Stop',
        required:true
    }
})

module.exports = mongoose.model("ChooseBus",chooseBusScheme);
