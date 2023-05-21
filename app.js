const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');

if(process.env.NODE_ENV!="PRODUCTION"){
    require('dotenv').config({path:"./config/config.env"})
    console.log(process.env.DB_URI);
}

app.use(cors())
app.use(express.json())

//Route Import
const admin = require('./routes/adminRoutes')
const price = require('./routes/priceRoutes');
const conductor = require('./routes/conductorRoutes');
const course = require('./routes/courseRouters');
const coordinator = require('./routes/coordinatorRouters');
const driver = require('./routes/driverRouters');
const student = require('./routes/studentRoutes');
const seat = require('./routes/seatBookedRouter');

app.use("/api",admin);
app.use("/api",price);
app.use("/api",conductor);
app.use("/api",course);
app.use("/api",coordinator);
app.use("/api",driver);
app.use("/api",student);
app.use("/api",seat);

if(process.env.NODE_ENV==="PRODUCTION"){
    app.use(express.static(path.join(__dirname,"../build")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../build/index.html"));
    })
}
module.exports = app;