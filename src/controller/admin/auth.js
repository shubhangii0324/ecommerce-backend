const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { use } = require("../../routes/admin/auth");

exports.signup = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((error, user) => {
        if(user) {
           return res.status(400).json({
                message : "Admin already exists"
            });
        }
    });

        const newUser = new User({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: 'admin'
    });

    newUser.save((error, data) => {
        if(error) {
            console.log(error);
            res.status(400).json({
                message: "Something went wrong"
            });
        }
        if(data) {
            res.status(201).json({
                message: "Admin created"
            });
        }
    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email 
    }).exec((error, user) => {
        if(error) {
            return res.status(400).json({error})
        }
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, 'mernSecret', {expiresIn: '1h'});
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '1h' });
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                });
            } else {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }
        } else {
            return res.status(400).json({
                message: "something went wrong!"
            })
        }
    });
}


exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successfull!'
    })
}