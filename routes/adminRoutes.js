const express = require('express');

const {
    registerUser,
    loginUser,
    pendingConductorList,
    acceptConductorRequest,
    rejectCondutorRequest,
    makeCoordinator,
    requestedBusList,
    addBus,
    pendingDriverList,
    acceptDriverRequest,
    rejectDriverRequest
} = require('../controller/adminController');
const { isAuthenticateAdmin } = require('../Middleware/adminAuth');


const router = express.Router();

router.route("/admin/signup").post(registerUser);
router.route("/admin/login").post(loginUser);
router.route("/admin/pendingConductorList").post(isAuthenticateAdmin,pendingConductorList);
router.route("/admin/acceptConductorRequest/:id").post(isAuthenticateAdmin,acceptConductorRequest);
router.route("/admin/rejectConductorRequest/:id").delete(isAuthenticateAdmin,rejectCondutorRequest);
router.route("/admin/pendingDriverList").post(isAuthenticateAdmin,pendingDriverList);
router.route("/admin/acceptDriverRequest/:id").post(isAuthenticateAdmin,acceptDriverRequest);
router.route("/admin/rejectDriverRequest/:id").post(isAuthenticateAdmin,rejectDriverRequest);
router.route("/admin/makeCoordinator/:id").post(isAuthenticateAdmin,makeCoordinator);
router.route("/admin/requestBusList").post(isAuthenticateAdmin,requestedBusList);
router.route("/admin/addBus/:id/:driver_id/:conductor_id").post(isAuthenticateAdmin,addBus);

module.exports=router;