const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const shortid = require('shortid');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({ 
            firstName, 
            lastName, 
            email, 
            hash_password,
            username: shortid.generate(),
            role: 'admin'
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                transporter.sendMail({
                    to: _user.email,
                    from:"no-reply@sfconsultant.com",
                    subject:"Registration Successfull",
                    html: "<h1>Welcome to our ecommerce service</h1>"
                })
                    return res.status(201).json({
                        message: 'Admin created Successfully..!'
                    })
            }
        });



    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){

            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id, role: user.role}, 'mernSecret', { expiresIn: '1d' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '1d' });
                res.status(200).json({
                    token,
                    user: {_id, firstName, lastName, email, role, fullName}
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    })
}

exports.forgotPassword = (req, res) => {
    crypto.randomBytes(32, (error, buffer) => {
        if(error){
            console.log(error);
        }
        const token = buffer.toString("hex")
        User.findOne({email: req.body.email})
        .then(_user => {
            if(!_user){
                return res.status(400).json({
                    message: 'No user with the given email'
                })
            }
            _user.resetToken = token
            _user.expireToken = Date.now() + 3600000
            _user.save().then((result) => {
                transporter.sendMail({
                    to: _user.email,
                    from:"no-reply@sfconsultant.com",
                    subject:"Password reset email",
                    html: `<p>You requested for password reset</p>
                           <h5>Click on this <a href="http://localhost:3000/admin/reset-password/${token}>link</a> to reset your password</h5>`
                })
                res.json({message: 'Check mail'})
            })
        })
    })
}