const Taxes = require('../models/taxes');
const shortid = require('shortid');
const Category = require('../models/category');

exports.createTaxes = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, rate, price, category, createdBy
    } = req.body;

    const taxes = new Taxes({
        name: name,
        rate: rate,
        price: price,
        category: category,
        createdBy: req.user._id
    });

    taxes.save(((error, taxes) => {
        if(error) return res.status(400).json({ error });
        if(taxes){
            res.status(201).json({ taxes });
        }
    }));


};