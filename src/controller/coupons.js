const Coupons = require('../models/coupons');
const shortid = require('shortid');
const Category = require('../models/category');

exports.createCoupons = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, rate, price, category, createdBy
    } = req.body;

    const coupons = new Coupons({
        name: name,
        rate: rate,
        price: price,
        category: category,
        createdBy: req.user._id
    });

    coupons.save(((error, coupons) => {
        if(error) return res.status(400).json({ error });
        if(coupons){
            res.status(201).json({ coupons });
        }
    }));


};