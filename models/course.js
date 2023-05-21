const mongoose = require('mongoose')
const {Schema} = mongoose;

const courseScheme = new Schema({
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
    }

});

module.exports = mongoose.model("Course",courseScheme);