var User = require('../models/user.model');

module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('auth/login');
    }

    User.find({ id: req.signedCookies.userId}).exec(function(err, user){
        if(!user){
            res.redirect('auth/login');
            return;
        }
            res.locals.user = user;
            
        
    })
    next();
};