const express = require('express');
const { registerDriver } = require('../controller/driverController');


const router = express.Router();

router.route("/driver/signup").post(registerDriver);

module.exports=router;