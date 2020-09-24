const express = require("express");
// const { addCategory,  } = require("../controller/category");
const { isLoggedIn, adminMiddleware } = require("../middlewares");
const { createProduct } = require("../controller/product"); 
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


router.post("/product/create", isLoggedIn, adminMiddleware, upload.array('image'), createProduct);
// router.get("/category/getcategory", getCategory);

module.exports = router;