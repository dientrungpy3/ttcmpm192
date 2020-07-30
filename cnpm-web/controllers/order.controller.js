var db = require('../db');

module.exports.addOrder = function(req,res){
    var newOrder = 0;

    if(!req.signedCookies.newOrder){
        res.cookie('newOrder', 1, {signed: true} );
        newOrder = 1;
    }
    else{
        newOrder = parseInt(req.signedCookies.newOrder);
        newOrder++;
        res.cookie('newOrder', newOrder, {signed: true} );
    }

    if(!req.signedCookies.idFood){
        res.cookie('idFood',req.body.id.toString(), {signed: true} );
    }
    else{
        var id = req.signedCookies.idFood + ',' + req.body.id.toString();
        res.cookie('idFood',id, {signed: true} );
    }
    res.send({user: res.locals.user, newOrder: newOrder});
}

module.exports.newOrder = function(req, res, next){
    var newOrder = 0;
    if(req.signedCookies.newOrder){
        newOrder = parseInt(req.signedCookies.newOrder);
    }
    res.locals.newOrder = newOrder;
    next();
}

module.exports.toCart = function(req, res){
    if(!res.locals.user){
        res.redirect('/login');
        return;
    }
    res.clearCookie('newOrder');
    var foods = [];
    if(req.signedCookies.idFood){
        var dbFoods = db.get('foods').value();
        var idArr = req.signedCookies.idFood.split(',');
        for(var id of idArr){
            var old = 0;
            for(var food of foods){
                if(id == food.id){
                    food.count++;
                    old = 1;
                    break;
                }
            }
            if(!old){
                var comp = 0;
                for(var key in dbFoods){
                    for(var food of dbFoods[key]){
                        if(food.id == id){
                            foods.push({
                                id: food.id,
                                image: food.image,
                                name: food.name,
                                description: food.description,
                                price: parseInt(food.price),
                                count: 1
                            });
                            comp = 1;
                            break;
                        }
                    }
                    if(comp)break;
                }
            }
        }
    }
    res.render('cart',{foods: foods});
}

module.exports.updateCart = function(req,res) {
    res.cookie('idFood',req.body.stringFoods, {signed: true} );
    res.send("");
}