const Course = require('../models/course');

//add a course branch and sem admin login required
exports.addCourse = async(req,res) =>{
    const new_course =await Course.create(req.body);
    
    return res.status(200).json({
        successCourse:true,
        new_course
    })
}

//see a course list - login not required
exports.courseList = async(req,res) =>{
    const course = await Course.find();
    return res.status(200).json({
        successCourse:true,
        course
    });
}

//delete a course from list - Admin login required 
exports.deleteCourse = async(req,res) => {
    const course = await Course.findById(req.params.id);
    if(!course)
    {
        return res.status(500).json({
            successCourse:false,
            message: "Something Error happened !!"
        })
    }
    await Course.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        successCourse:true,
        course
    });
}

//update a course from a list  - Admin login required
//update price - Done by Admin
exports.updateCourse = async(req,res) =>{
    const node = await Course.findById(req.params.id);
    if(!node)
    {
        return res.status(500).json({
            successCourse:false,
            message: "Something Error happened !!"
        })
    }
    const courseUpdate = {};
    const {course,branch,sem} = req.body;
    if(course)
        courseUpdate.course=course;
    if(branch)
        courseUpdate.branch=branch;
    if(sem)
        courseUpdate.sem=sem;
    //console.log(courseUpdate);
    const unode = await Course.findByIdAndUpdate(req.params.id,{$set:courseUpdate},{new:true});
    return res.status(200).json({
        successCourse:true,
        unode
    });
}