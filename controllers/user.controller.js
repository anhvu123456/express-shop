var User = require('../models/user.model');
var shortid = require('shortid');
const { unsubscribe } = require('../routes/auth.route');

module.exports.index = function(req, res){
    User.find({}).exec(function(err, users){
        res.render('users/index', {
            users: users
        });
    });
};  

module.exports.search = function(req, res){
    var q = req.query.q;
    User.find({name: q}).exec(function(err, user){
        res.render('users/index', {
            users: user
        });
    })    
};

module.exports.create = function(req, res){
    res.render('users/create');
};

module.exports.get = function(req, res){
    var id = req.params.id;

    User.findOne({ _id: id}).exec(function(err, user){
        console.log(user);
        res.render('users/view', {
            user: user
        })
    });
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    var user = new User(req.body);
    user.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/users');
        }
    });
};
