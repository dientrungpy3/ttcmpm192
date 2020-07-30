const express = require('express');
const app = express();
const port = 8000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var login = require('./controllers/login.controller.js');
var register = require('./controllers/register.controller.js');
var fpass = require('./controllers/fpass.controller.js');
var order = require('./controllers/order.controller.js');
var anonymous = require('./controllers/anonymous.controller.js');
var contact = require('./controllers/contact.controller.js');
var payment = require('./controllers/payment.controller.js');
var db = require('./db');

app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('xzckqopknsgjnonsgn12314154'));

app.get('/', login.auth, order.newOrder, function(req, res){
    var userCount = db.get('users').value().length;
    var foods = db.get('foods').value();
    var foodCount = foods.thucAnNhanh[foods.thucAnNhanh.length - 1].id;
    res.render('index',{userCount: userCount, foodCount: foodCount});
});

app.get('/order', login.auth, order.newOrder, function(req, res){
    res.render('order',{foods:db.get('foods').value()});
});
app.post('/order', login.auth, order.addOrder);


app.get('/cart', login.auth, order.toCart);
app.post('/cart', login.auth, order.updateCart);


app.get('/login',login.getLogin);
app.post('/login',login.checkLogin);


app.get('/register',function(req,res){
    res.render('register',{value:{name:"",yearBirth:"",phone:"",password:"",password2:""}});
})
app.post('/register',register.checkRegister);


app.get('/forgot-password',function(req,res){
    res.render('forgot-password',{value:{phone:"",password:""}});
});
app.post('/forgot-password', fpass.checkForgotPassword);


app.get('/contact', login.auth, order.newOrder, function(req, res){
    if(!res.locals.user){
        res.redirect('/login');
        return;
    }
    res.render('contact');
});
app.post('/contact', login.auth, contact.saveContact);


app.post('/anonymous', anonymous.contact);

app.post('/payment', payment.momo);


app.listen(port, function(){
    console.log(`Example app listening at http://localhost:${port}`);
});