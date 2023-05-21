const Student_ds = require('../models/Student_ds');
const ChooseBus  = require('../models/choosebus');
const Stop = require('../models/stop');
const Bus = require('../models/bus');
const BookSeat = require('../models/bookSeat');
const { default: mongoose } = require('mongoose');

//resgister the student 
exports.registerStudentDS = async(req,res)=>{
    const {student_id,fname,lname,course,branch,sem,password} = req.body;
    const checkUserId=await Student_ds.findOne({student_id});
    if(checkUserId)
        return res.status(400).json({
            studentSuccess:false,
            message:"This student is exist."
        })

        if(password.length<8)
        return res.status(401).json({studentSuccess:false,message:"Please enter the password atleast 8 letters"});

        const user = await Student_ds.create({
            student_id,fname,lname,course,branch,sem,password
        });

        return res.status(201).json({conductorSuccess:true,user});
    
}

//login the student
exports.loginStudentDS = async(req,res) =>{
    try
    {
    const {student_id,password} = req.body;
    const student = await Student_ds.findOne({student_id});
    
    if(!student)
        return res.status(401).json({statusStudentDS:false,message:"Invalid student id or passwword"});
    const isPasswordMatched = await student.comparePassword(password);
    
    if(!isPasswordMatched)
        return res.status(401).json({statusStudentDS:false,message:"Invalid student id or password"});
    
    const token = student.getJWTToken();
    //console.log(student);
    
    const selectBus = await ChooseBus.findOne({student_id:student._id});
    if(!selectBus)
        return res.status(200).json({
            studentDSSuccess:true,
            fun:true
        })
    return res.status(200).json({
        studentDSSuccess:true,
        token,
        name:student.fname,
        student_id:student.student_id,
        id:student._id,
        bus_detials:selectBus
    })
    }
    catch(err)
    {
        return res.status(400).json({
            studentDSSuccess:false,
            message:"Invalid Stduent id or password"
        })
    }
}

exports.chooseBus = async(req,res) =>{
    try
    {
    console.log(req.user.student_id);
    const student_id = req.user._id;
    const find = await ChooseBus.findOne({student_id});
    if(!find)
        return res.status(400).json({success:false});
    return res.status(400).json({find,success:true});
    }
    catch(err)
    {
        return res.json({message:err.message});
    }
}

exports.newChooseBus = async(req,res) =>{
    console.log(req.body.student_id);
    console.log(req.body.stop);
    console.log(req.body.bus);
    const fun = await ChooseBus.create(req.body);
    return res.status(200).json({
        success:true,
        fun
    })
}

exports.selectStops = async(req,res)=>{
        const stops = await Stop.find();
        let stp = []
        for(let i=0;i<stops.length;i++)
        {
            stp.push(stops[i].stop_name);
        }
        stp = [...new Set(stp)]
        return res.status(200).json({
            success:true,
            stp
        })
}
exports.selectBusByStops = async(req,res)=>{
    //console.log(req.body.stop_name);
    try
    {
        const stop_details =await Stop.find({stop_name:req.body.stop_name});
    let bus_details = [];
    console.log(stop_details.length);
    for(let i=0;i<stop_details.length;i++)
    {
        const bus_no = stop_details[i].bus_no;
        let bus = await Bus.findById({_id:bus_no});
        bus_details.push(bus);
    }
    return res.status(200).json({
        success:true,
        stop_details,
        bus_details
    })
    }
    catch(err)
    {
        console.log(err.message);
    }
    
}

//select seat by student 
exports.selectSeat = async(req,res) =>{
    try{
    // console.log(req.body.seat_no);
    // console.log(req.header('bus_id'))
    const prev_book=await BookSeat.findOne({student_details:req.user._id});
    if(!prev_book)
    {
        await BookSeat.create({
            seat_no:req.body.seat_no,
            student_details:req.user._id,
            bus_details:req.header('bus_id')
        });
        return res.status(200).json({
            seat_no:req.body.seat_no,
            success:true,
        })
    }
    return res.status(400).json({
        success:false,
        message:"You have already book 1 seat"
    })
    }
    catch(err)
    {
        console.log(err.message);
    }
}

exports.isLive = async(req,res)=>{
    const student = req.params.id;
    try {
        if(mongoose.isValidObjectId(student)){

            const isStudent = await Student_ds.findById(student);
            if(!isStudent) return res.status(404).json("Not Found!")
            if(!isStudent?.live){
                const Student = await Student_ds.findByIdAndUpdate(student,{
                    $set:{
                        live:true
                    }
                })
                res.status(200).json(true);
            }else{
                const Student = await Student_ds.findByIdAndUpdate(student,{
                    $set:{
                        live:false
                    }
        })
        res.status(200).json(false);
    }
    }
} catch (error) {
    console.log(error)
}
}

exports.updateLive = async(req,res)=>{
    const user = req.params.id;
    const {lat, lng} = req.params;
    const isUser = await Student_ds.findById(user);
    if(!isUser) return res.status(404).json("Not Found")
    if(isUser?.live){
        const data = await Student_ds.findByIdAndUpdate(user,{
           $set:{
            lat:lat,
            lng:lng
           }
        });
        res.status(200).json({message:"Live location Updated!",data});
    }else{
        return res.status(301).json("first enable live location!");
    }
}
exports.statuslive = async(req,res)=>{
    const user = req.params.id;
    const User = await Student_ds.findById(user);
    if(!User) return res.status(404).json("Not Found")
    res.status(200).json(User.live);
}
exports.getCoordinates = async(req,res)=>{
    const user = req.params.id;
    const User = await Student_ds.findById(user);
    res.status(200).json({lat:User.lat,lng:User.lng});
}