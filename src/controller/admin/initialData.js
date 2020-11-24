const Category = require('../../models/category');
const Product = require('../../models/product');
const Taxes = require('../../models/taxes');
const User = require('../../models/user');
const Seller = require('../../models/seller');
const Coupons = require('../../models/coupons');


function createCategories(categories, parentId = null){

    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;

};

exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select('_id name price quantity slug description cluster artisan productPictures category')
        .populate({ path: 'category', select: '_id name' })
        .exec();
    const taxes = await Taxes.find({})
    .select('_id name rate price category')
    .populate({ path: 'category', select: '_id name'})
    .exec();
    const users = await User.find({})
    .select('_id firstName lastName email')
    .exec();
    const sellers = await Seller.find({})
    .select('_id firstName lastName email')
    .exec();
    const coupons = await Coupons.find({})
    .select('_id name rate price category')
    .populate({ path: 'category', select: '_id name'})
    .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products,
        taxes,
        users,
        sellers,
        coupons
    })

}
