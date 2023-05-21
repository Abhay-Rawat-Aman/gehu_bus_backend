const express = require('express');

const {
    seeBookedSeatStudent, 
    seeBookedSeatConductor
} = require('../controller/seatbookController');
const { isAuthenticateStudent } = require('../Middleware/studentAuth');
const { isAuthenticateConductor } = require('../Middleware/conductorAuth');

const router = express.Router();
router.route("/seeBookedSeatStudent").get(isAuthenticateStudent,seeBookedSeatStudent);
router.route("/seeBookedSeatConductor").get(isAuthenticateConductor,seeBookedSeatConductor);
module.exports=router;