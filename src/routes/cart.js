const express = require("express");
const { addItemToCart } = require("../controller/cart");
const { isLoggedIn, userMiddleware } = require("../middlewares");
const router = express.Router();

router.post("/user/cart/addtocart", isLoggedIn, userMiddleware, addItemToCart);
router.get("/category/getcategory");

module.exports = router;