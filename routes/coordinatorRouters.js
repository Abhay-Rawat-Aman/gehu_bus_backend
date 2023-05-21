const express = require('express');
const { 
    loginCoordinator,
    requestBus, 
    addStop
} = require('../controller/coordinatorController');

const {isAuthenticateCoordinator} = require('../Middleware/coordinatorAuth')

const router = express.Router();

router.route("/coordinator/login").post(loginCoordinator);
router.route("/coordinator/requestBus").post(isAuthenticateCoordinator,requestBus);
router.route("/coordinator/addStop/:busid").post(isAuthenticateCoordinator,addStop);
module.exports=router;