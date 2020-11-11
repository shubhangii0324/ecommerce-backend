const Seller = require('../models/seller');
const shortid = require('shortid');

exports.createSeller = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        firstName, lastName, email,
    } = req.body;

    const seller = new Seller({
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    seller.save(((error, seller) => {
        if(error) return res.status(400).json({ error });
        if(seller){
            res.status(201).json({ seller });
        }
    }));


};
