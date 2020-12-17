const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, productCode, mrpPrice, listPrice, gst, makingCost, size, description, category, quantity, cluster, artisan, createdBy
    } = req.body;
    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.location }
        });
    }

    const product = new Product({
        productCode: productCode,
        name: name,
        slug: slugify(name),
        mrpPrice: mrpPrice,
        listPrice: listPrice,
        makingCost: makingCost,
        gst: gst,
        size: size,
        quantity: quantity,
        description: description,
        cluster: cluster,
        artisan: artisan,
        productPictures: productPictures,
        category: category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product, files: req.files });
        }
    }));


};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({error});
        }

        if(category){
            Product.find({ category: category._id })
            .exec((error, products) => {

                if(error){
                    return res.status(400).json({error});
                }

                if(products.length > 0){
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                        }
                    });
                }

                
            })
        }
        

        
    });
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if(productId) {
        Product.findOne({ _id: productId })
        .exec((error, product) => {
            if(error) return res.status(400).json({ error });
            if(product) {
                res.status(200).json({ product });
            }
        });
    }else {
        return res.status(400).json({ error: 'Params required'});
    }
}

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
    .select("_id name productCode, mrpPrice, listPrice, gst, makingCost, size, description, category, quantity, cluster, artisan, productPictures")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
