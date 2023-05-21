const Admin = require('../models/admin');
const Conductor = require('../models/conductor');
const Coordinator =  require('../models/coordinator');
const BusRequest = require('../models/busrequest');
const Driver = require('../models/driver');
const Bus = require('../models/bus');

//Register a admin
exports.registerUser = async(req,res) => {
    const {name,username,password}=req.body;
    const checkUserId=await Admin.findOne({username});
    if(checkUserId)
        return res.status(400).json({
            adminSuccess:false,
            message:"This admin is exist."
        })

    //console.log(name,username,password);
    const user = await Admin.create({
        name,username,password
    });
    return res.status(201).json({adminSuccess:true,user});

}

//Login a admin
exports.loginUser = async(req,res) => {
    const {username,password}=req.body;
    const admin = await Admin.findOne({username});
    if(!admin)
        return res.status(401).json({adminSuccess:false,message:"Invalid username or password"});
    
    const isPasswordMatched = await admin.comparePassword(password);
    if(!isPasswordMatched)
        return res.status(401).json({adminSuccess:false,message:"Invalid username or password"});
    const token = admin.getJWTToken();
    return res.status(200).json({
        adminSuccess:true,
        token
    })
}

//see conductor request pending - admin login 
exports.pendingConductorList = async(req,res) =>{
    const list = await Conductor.find({status:'Pending'});
    return res.status(200).json({
        adminSuccess:true,
        list
    })
}

//accept the request of conductor - admin login
exports.acceptConductorRequest = async(req,res) =>{
    const extra = await Conductor.find({status:'Extra'});
    if(extra.length>3)
        return res.status(400).json({
            adminSuccess:false,
            message:"No need of extra conductors. Allready we have 3 extra conductor"
        })
    //console.log(req.params.id);
    const accept = await Conductor.findById(req.params.id);
    accept.status = 'Extra';
    const unode = await Conductor.findByIdAndUpdate(req.params.id,{$set:accept},{new:true});
    return res.status(200).json({
        adminSuccess:true,
        unode
    })
}

//reject the request of conductor - admin login 
exports.rejectCondutorRequest = async(req,res)=>{
    console.log(req.params.id);
    const reject = await Conductor.findById(req.params.id);
    if(!reject)
    return res.status(500).json({
        successConductor:false,
        message: "Something Error happened !!"
    })
    await Conductor.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        reject
    })
}

//see driver request pending - admin login 
exports.pendingDriverList = async(req,res) =>{
    const list = await Driver.find({status:'Pending'});
    return res.status(200).json({
        adminSuccess:true,
        list
    })
}

//accept the request of driver - admin login
exports.acceptDriverRequest = async(req,res) =>{
    const extra = await Driver.find({status:'Extra'});
    if(extra.length>3)
        return res.status(400).json({
            adminSuccess:false,
            message:"No need of extra Driver. Allready we have 3 extra Driver"
        })
    //console.log(req.params.id);
    const accept = await Driver.findById(req.params.id);
    accept.status = 'Extra';
    const unode = await Driver.findByIdAndUpdate(req.params.id,{$set:accept},{new:true});
    return res.status(200).json({
        adminSuccess:true,
        unode
    })
}

//reject the request of driver - admin login 
exports.rejectDriverRequest = async(req,res)=>{
    console.log(req.params.id);
    const reject = await Driver.findById(req.params.id);
    if(!reject)
    return res.status(500).json({
        successDriver:false,
        message: "Something Error happened !!"
    })
    await Driver.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        reject
    })
}

//Make coordinator to any conductor - admin login
exports.makeCoordinator = async (req,res) =>{
    try
    {
    const fun = await Conductor.findById(req.params.id);
    if(!fun || fun.status=='Pending')
        return res.status(400).json({successAdmin:false,message:"Somthing is wrong"});
    
    const coordinator = await Coordinator.create({
        conductor_id:req.params.id
    });

    return res.status(200).json({
        successAdmin:true,
        coordinator
    })
    }
    catch(err)
    {
        return res.status(401).json({
            successAdmin:false,
            message:"This Conductor is already coordinator"
        })
    }
}

//see the requested bus - admin login required
exports.requestedBusList = async(req,res) => {
    let rB = await BusRequest.find();
    let data = []
    for(let i=0;i<rB.length;i++)
    {
        const x = await Coordinator.findOne(rB[i].coordinator_id);
        const fx = await Conductor.findOne(x.conductor_id);
        let name = fx.fname.concat(" ");
        name = name.concat(fx.lname);
        const obj = {
            name,val:rB[i]
        };
        data.push(obj);
    }
    res.status(200).json({
        successBusRequest:true,
        data
    })
}

//add the bus - admin login required
exports.addBus = async(req,res) =>{
    const rbus_id=req.params.id;
    const driver_id=req.params.driver_id;
    const conductor_id=req.params.conductor_id;
    const {bus_no,no_of_seats} = req.body;
    const no_of_students = 0;
    console.log(rbus_id,driver_id,conductor_id,bus_no,no_of_seats,no_of_students);
    if(bus_no.length!=10)
        return res.status(400).json({
            addBus:false,
            message:"the bus number is not valid"
        })
        
    if(!(bus_no[0]>='A' && bus_no[0]<='Z') || !(bus_no[1]>='A' && bus_no[1]<='Z') || !(bus_no[4]>='A' && bus_no[4]<='Z') || !(bus_no[5]>='A' && bus_no[5]<='Z') )
        return res.status(400).json({
            addBus:false,
            message:"the number is not valid"
        })
    
        if(!(bus_no[2]>='0' && bus_no[2]<='9') || !(bus_no[3]>='0' && bus_no[3]<='9'))
        return res.status(400).json({
            addBus:false,
            message:"the number is not valid"
        })
    
    for(let i=6;i<10;i++)
    {
        if(!(bus_no[i]>='0' && bus_no[i]<='9'))
        return res.status(400).json({
            addBus:false,
            message:"the number is not valid"
        })  
    }
    
    const x = await Bus.find();
    const collage_bus_no = x.length+1;
    console.log(collage_bus_no);

    const dvr=await Driver.findByIdAndUpdate(driver_id,{status:'Active'});
    const cnt=await Conductor.findByIdAndUpdate(conductor_id,{status:'Active'});

    const bus = await Bus.create({
        bus_no,collage_bus_no,driver_id,conductor_id,no_of_seats,no_of_students
    });
    

    return res.status(200).json({
        addBus:true,
        bus        
    })
    
}