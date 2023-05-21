const Conductor = require('../models/conductor');
const Coordinator = require('../models/coordinator');
const BusRequest = require('../models/busrequest');
const Stop = require('../models/stop');

exports.loginCoordinator = async(req,res)=>{
    const {username,password} = req.body;
    const conductor = await Conductor.findOne({username});
    
    if(!conductor)
        return res.status(401).json({coordinatorStatus:false,message:"Invalid username or passwword"});
    const isPasswordMatched = await conductor.comparePassword(password);
    
    if(!isPasswordMatched)
        return res.status(401).json({coordinatorSuccess:false,message:"Invalid username or password"});
    
    //console.log(conductor);
    if(conductor.status=='Pending')
        return res.status(401).json({coordinatorSuccess:false,message:"You Applied but the admin not respond you"});
    
    const coordinator = await Coordinator.findOne({conductor_id:conductor._id});
    if(!coordinator)
        return res.status(401).json({coordinatorSuccess:false,message:"Your are not a coordinator"});
    const token = coordinator.getJWTToken();
    return res.status(200).json({
        coordinatorSuccess:true,
        token
    })
}

//request for bus - coordinator login required
exports.requestBus = async(req,res) =>{
    const b = await BusRequest.create({coordinator_id:req.user._id});
    return res.status(200).json({
        busRequestSucces:true,
        message:"Your bus request is send",
        b
    })
    
}

//add the stops of bus - Coordinator login required
exports.addStop= async(req,res)=>{
    const bus_no = req.params.busid;
    const {stop_name,morning_time,evening_time} = req.body;
    //console.log(bus_no,stop_name,morning_time,evening_time);
    const b = await Stop.create({
        bus_no,stop_name,morning_time,evening_time
    });
    return res.status(200).json({
        addStopSucces:true,
        message:"The bus is successfully added",
        b
    })
}