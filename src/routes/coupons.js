const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const path = require('path');
const { createCoupons } = require('../controller/coupons');


router.post('/coupons/create', requireSignin, adminMiddleware, createCoupons);;

module.exports = router;