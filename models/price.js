const mongoose = require('mongoose')
const {Schema} = mongoose;
const priceScheme = new Schema({
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    dsHostler:{
        type:String,
        required:true,
        default:"Day Scholar"
    }
})

module.exports = mongoose.model("Price",priceScheme);