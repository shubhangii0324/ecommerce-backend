const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../../controller/admin/auth");
const { isLoggedIn } = require("../../middlewares/index");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/admin/logout", logout);

module.exports = router;