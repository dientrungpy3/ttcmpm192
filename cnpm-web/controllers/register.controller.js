var db = require('../db');
var md5 = require('md5');
var key = "nhan@69#$$$";

module.exports.checkRegister = function(req,res){
    var user = db.get('users')
                .find({
                    phone:req.body.phone           
                }).value();
    if(user || req.body.password !== req.body.password2){
        var wrong;
        if(user)wrong = 1;
        else wrong = 0;
        res.render('register',{wrong: wrong, value: req.body});
        return;
    }
    var users = db.get('users').value();
    var id = users.length + 1;
    db.get('users').push({
        id: id,
        name: req.body.name,
        yearBirth: req.body.yearBirth,
        phone: req.body.phone,
        password: md5(req.body.password+key),
        contact: []
    }).write();
    res.cookie('user', id, {signed: true} );
    res.redirect('/');
}