const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createSeller } = require('../controller/seller');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


router.post('/seller/create', requireSignin, adminMiddleware, createSeller);

module.exports = router;