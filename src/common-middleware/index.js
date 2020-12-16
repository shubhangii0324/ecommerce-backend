const jwt = require('jsonwebtoken');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const multers3 = require('multer-s3');
const aws = require('aws-sdk');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const s3 = new aws.S3({
    accessKeyId: 'AKIAIWCJPNHS5SYAAP7A',
    secretAccessKey: '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'
})

exports.upload = multer({ storage });

exports.uploads3 = multer({
    storage: multers3({
        s3: s3,
        bucket: 'sf-ecommerce',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldname: file.fieldname});
        } ,
        key: function (req, file, cb) {
            cb(null, shortid.generate() + '-' + file.originalname);
        }
    })
})

exports.requireSignin = (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, 'mernSecret');
        req.user = user;
    }else{
        return res.status(400).json({ message: 'Authorization required' });
    }
    next();
    //jwt.decode()
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({ message: 'User access denied' })
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: 'Admin access denied' })
    }
    next();
}