const Conductor = require('../models/conductor');
const Bus = require('../models/bus');

//Register a conductor
exports.registerConductor = async(req,res) => {
    const {fname,lname,contactno,username,password,aadharno}=req.body;
    const checkUserId = await Conductor.findOne({username});
    if(checkUserId)
        return res.status(400).json({conductorSuccess:false,message:"This username is exist"});
    const checkUserAadharno = await Conductor.findOne({aadharno});
    
    if(checkUserAadharno)
        return res.status(400).json({conductorSuccess:false,message:"Invalid Aadhar No."});
        
    if(contactno.length!=10 || contactno[0]==0)
        return res.status(401).json({conductorSuccess:false,message:"Please enter the correct contact no of 10 digits"});
    if(aadharno.length!=12 || aadharno[0]==0)
        return res.status(401).json({conductorSuccess:false,message:"Please enter the correct aadhar no of 12 digits"});
    if(password.length<8)
        return res.status(401).json({conductorSuccess:false,message:"Password should be atleast 8 characters "});
    
    const user = await Conductor.create({
        fname,lname,contactno,username,password,aadharno
    });
    
    return res.status(201).json({conductorSuccess:true,user});
}

//Login a conductor
exports.loginConductor = async(req,res)=>{
    const {username,password} = req.body;
    const conductor = await Conductor.findOne({username});
    
    if(!conductor)
        return res.status(401).json({conductorSuccess:false,message:"Invalid username or passwword"});
    const isPasswordMatched = await conductor.comparePassword(password);
    
    if(!isPasswordMatched)
        return res.status(401).json({conductorSuccess:false,message:"Invalid username or password"});
    
    //console.log(conductor);
    if(conductor.status=='Pending')
        return res.status(401).json({conductorSuccess:false,message:"You Applied but the admin not respond you"});
    else if(conductor.status=='Extra')
        return res.status(401).json({conductorSuccess:false,message:"The Bus is not allocated to you till now"});
    const token = conductor.getJWTToken();

    const bus = await Bus.findOne({conductor_id:conductor.id})
    console.log(bus);
    return res.status(200).json({
        conductorSuccess:true,
        token,
        bus
    })
}
exports.isLive = async(req,res)=>{
    const cond = req.params.id;
    const isConductor = await Conductor.findById(cond);
    if(!isConductor) return res.status(404).json("Not Found")
    if(!isConductor?.live){
        const conductor = await Conductor.findByIdAndUpdate(cond,{
            $set:{
                live:true
            }
        })
        
        res.status(200).json(true);
    }else{
        const conductor = await Conductor.findByIdAndUpdate(cond,{
            $set:{
                live:false
            }
        })
        
        res.status(200).json(false);
    }
}

exports.updateLive = async(req,res)=>{
    const user = req.params.id;
    const {lat,lng} = req.params;
    const isUser = await Conductor.findById(user);
    if(!isUser) return res.status(404).json("Not Found")
    if(isUser?.live){
        const data = await Conductor.findByIdAndUpdate(user,{
            $set:{
                    lat:lat,
                    lng:lng
            }
        });
        
        res.status(200).json("Live location Updated!");
    }else{
        return 
        res.status(301).json("First enable Live location!");
    }
}

exports.statuslive = async(req,res)=>{
    const user = req.params.id;
    const User = await Conductor.findById(user);
    if(!User) return res.status(404).json("Not Found")
    res.status(200).json(User.live);
}

exports.getCoordinates = async(req,res)=>{
    const user = req.params.id;
    const User = await Conductor.findById(user);
    res.status(200).json({lat:User.coordinates.lat,lng:User.coordinates.lng});
}