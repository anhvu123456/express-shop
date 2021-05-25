var Product = require('../models/product.model');

module.exports.index = async function(req, res){
    var products = await Product.find();
    res.render('products/index', {
        products: products
    });
};