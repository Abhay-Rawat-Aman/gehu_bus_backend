const mongoose = require('mongoose')

const connectdatabase = () =>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongodb is connected at: ${process.env.DB_URI}`);
    })
}

module.exports = connectdatabase;