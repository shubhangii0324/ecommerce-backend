const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createUser } = require('../controller/user');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


router.post('/user/create', requireSignin, adminMiddleware, createUser);

module.exports = router;