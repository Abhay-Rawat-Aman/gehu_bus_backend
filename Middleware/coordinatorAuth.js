const Coordinator = require('../models/coordinator')
const jwt = require('jsonwebtoken')

exports.isAuthenticateCoordinator = async (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
        return res.status(401).send({error:"please authentitcate using a valid token"});
    try
    {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Coordinator.findById(decodedData);
    }
    catch(err)
    {
        return res.status(401).send({error:"please authentitcate using a valid token"});
    }
    next();
}
