const express = require('express');

const 
{
    addCourse, 
    courseList,
    deleteCourse,
    updateCourse
} = require('../controller/courseController');

const { isAuthenticateAdmin } = require('../Middleware/adminAuth');

const router = express.Router();

router.route("/admin/addCourse").get(isAuthenticateAdmin,addCourse);
router.route("/courseList").get(courseList);
router.route("/admin/deleteCourse/:id").get(isAuthenticateAdmin,deleteCourse);
router.route("/admin/updateCourse/:id").get(isAuthenticateAdmin,updateCourse);


module.exports=router;