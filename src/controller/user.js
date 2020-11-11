const User = require('../models/user');
const shortid = require('shortid');

exports.createUser = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        firstName, lastName, email,
    } = req.body;

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    user.save(((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            res.status(201).json({ user });
        }
    }));


};
