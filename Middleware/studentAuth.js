const StudentDS = require('../models/Student_ds')
const jwt = require('jsonwebtoken')
const ChooseBus = require('../models/choosebus');

exports.isAuthenticateStudent = async (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
        return res.status(401).send({error:"please authentitcate using a valid token"});
    try
    {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await StudentDS.findById(decodedData);
    }
    catch(err)
    {
        return res.status(401).send({error:"please authentitcate using a valid token"});
    }
    next();
}
