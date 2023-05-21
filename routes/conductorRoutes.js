const express = require('express');

const {
    registerConductor,
    loginConductor,
    isLive,
    updateLive,
    statuslive,
    getCoordinates
} = require('../controller/conductorController');


const router = express.Router();

router.route("/conductor/signup").post(registerConductor);
router.route("/conductor/login").post(loginConductor);
router.route("/conductor/live/:id").post(isLive);
router.route("/conductor/location/update/:id").post(updateLive);
router.route("/conductor/get/status/live/:id").get(statuslive);
router.route("/conductor/get/location/live/:id").get(getCoordinates);
module.exports=router;