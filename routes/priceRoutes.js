const express = require('express');

const {
    addPrice,
    priceList,
    deletePrice,
    updatePrice
} = require('../controller/priceController');

const {isAuthenticateAdmin} = require('../Middleware/adminAuth');

const router = express.Router();

router.route("/admin/addprice").post(isAuthenticateAdmin,addPrice);
router.route("/priceList").post(priceList);
router.route("/admin/deletePrice/:id").post(isAuthenticateAdmin,deletePrice);
router.route("/admin/updatePrice/:id").post(isAuthenticateAdmin,updatePrice);
module.exports=router;