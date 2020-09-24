const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });
    const {
        name, price, desc, category, quantity, createdBy
    } = req.body;
    let images = [];

    if(req.files.length > 0) {
        images = req.files.map(file => {
            return { img: file.filename }
        });
    }
    
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        desc,
        images,
        category,
        createdBy: req.user._id

    });

    product.save((error, product) => {
        if(error) {
            return res.status(400).json({ error });
        }
        if(product) {
            return res.status(201).json({ product });
        }
    });
}