var db = require('../db');
var md5 = require('md5');
var key = "nhan@69#$$$";

module.exports.getLogin = function(req, res){
    res.clearCookie('user');
    res.clearCookie('newOrder');
    res.clearCookie('idFood');
    res.render('login',{wrong: 0, value:{phone: "", password: ""}});
}

module.exports.checkLogin = function(req, res){
    var user = db.get('users')
                .find({
                    phone:req.body.phone,
                    password:md5(req.body.password+key)           
                }).value();
    if(!user){
        res.render('login',{wrong: 1, value: req.body});
        return;
    }
    res.cookie('user', user.id, {signed: true} );
    res.redirect('/');
}

module.exports.auth = function(req,res,next){
    var user;

    if(req.signedCookies.user){
        user = db.get('users').find({id: parseInt(req.signedCookies.user)}).value();
    }

    res.locals.user = user;
    next();
}
