const mongoose = require('mongoose')

const {Schema} = mongoose;
const busRequestScheme = new Schema({
    coordinator_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Coordinator'
    }
})

module.exports = mongoose.model("BusRequest",busRequestScheme);