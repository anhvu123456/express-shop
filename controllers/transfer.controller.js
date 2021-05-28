var shortid = require('shortid');
var Transfer = require('../models/transfer.model');

module.exports.create = function(req, res, next){
    res.render('transfer/create');
};

module.exports.postCreate = function(req, res, next){
    var data = {
        amount: req.body.amount,
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    };
    var transfer = new Transfer(data);
    transfer.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/transfer/create');
        }
    })
    
};