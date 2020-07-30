var db = require('../db');


module.exports.contact = function(req, res){
    db.get('anonymous').push({
        name: req.body.name,
        mail: req.body.mail,
        subject: req.body.subject,
        message: req.body.message
    }).write();
    res.redirect('/');
}