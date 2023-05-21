const Driver = require('../models/driver');

exports.registerDriver = async(req,res) =>{
    const {fname,lname,contactno,licenceno}=req.body;
    
    const checkUserId = await Driver.findOne({licenceno});

    if(checkUserId)
        return res.status(400).json({driverSuccess:false,message:"This driver is exist"});

    if(contactno.length!=10 || contactno[0]==0)
        return res.status(401).json({driverSuccess:false,message:"Please enter the correct contact no of 10 digits"});
    
    const user = await Driver.create({
        fname,lname,contactno,licenceno
    });

    return res.status(201).json({driverSuccess:true,user});

}