const express = require("express");

const {
    registerStudentDS, 
    loginStudentDS,
    chooseBus,
    selectStops,
    selectBusByStops,
    newChooseBus,
    selectSeat,
    isLive,
    updateLive,
    statuslive,
    getCoordinates
} = require('../controller/studentController');
const { isAuthenticateStudent} = require("../Middleware/studentAuth");


const router = express.Router();

router.route("/studentds/signup").post(registerStudentDS);
router.route("/studentds/login").post(loginStudentDS);
router.route("/studentds/chooseBus").post(isAuthenticateStudent,chooseBus);
router.route("/studentds/selectStop").post(isAuthenticateStudent,selectStops);
router.route("/studentds/newChooseBus").post(isAuthenticateStudent,newChooseBus);
router.route("/studentds/selectBusByStops").post(isAuthenticateStudent,selectBusByStops);
router.route("/studentds/selectSeat").post(isAuthenticateStudent,selectSeat);
router.route("/studentds/live/:id").post(isLive);
router.route("/studentds/location/update/:id/:lat/:lng").post(updateLive);
router.route("/studentds/get/status/live/:id").get(statuslive);
router.route("/studentds/get/location/live/:id").get(getCoordinates);


module.exports = router;