const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const path = require('path');
const { createTaxes } = require('../controller/taxes');


router.post('/taxes/create', requireSignin, adminMiddleware, createTaxes);;

module.exports = router;