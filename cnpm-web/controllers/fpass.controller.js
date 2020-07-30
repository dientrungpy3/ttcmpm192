var db = require('../db');
var md5 = require('md5');
var key = "nhan@69#$$$";


module.exports.checkForgotPassword = function(req,res){
    var user = db.get('users')
                .find({
                    phone:req.body.phone           
                }).value();
    if(!user){
        res.render('forgot-password',{wrong: 1, value: req.body});
        return;
    }
    db.get('users').find({
                    phone:req.body.phone           
                    })
                   .assign({password: md5(req.body.password+key)}).write();
    res.cookie('user', user.id, {signed: true} );
    res.redirect('/');
}