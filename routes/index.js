var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = require('./model.js');
var db = mongoose.connection;
/* GET home page. */

router.get('/', function(req, res, next) {
	Book.find({}).exec(function(err,result){
		if(err){
			console.log('Error has occured');
		}
		else{
			console.log(result);
			res.render('index', { result: result });
		}
	});	
});

router.get('/about',function(req,res,next){
		res.render('about');
});
router.get('/books/:ids',function(req,res,next){
		Book.find({ids:req.params.ids}).exec(function(err,result){
		if(err){
			console.log('Error has occured');
		}
		else{
			console.log(result);
			res.render('books',{idse:req.params.ids , result:result });
			
		}
	});	
	
});



router.get('/signup',function(req,res,next){
    res.render('signup');
});

router.get('/login',function(req,res,next){
    res.render('login');
});


router.get('/cart',function(req,res,next){
	var cart = req.session.cart;
	var displayCart = {items:[],total:0}
	var total = 0;

	//Get total
	console.log(cart);

	for(var item in cart){
	
		displayCart.items.push(cart[item]);
		total += (cart[item].qty * cart[item].price);
	}

	displayCart.total = total;
		console.log(displayCart);
		console.log(displayCart.items)
    res.render('cart',{cart:displayCart});
});



router.post('/cartadd/:id',function(req,res,next){
	req.session.cart =req.session.cart || {};
	console.log('hey');
	var cart = req.session.cart;
	Book.findOne({ids:req.params.id},function(err,result){
		if(err){
			console.log(err);
		}
		if(cart[req.params.id]){
			cart[req.params.id].qty++;
		}
		else{
			cart[req.params.id] = {
				item:result.ids,
				title:result.title,
				price:result.price,
				qty:1
			}
		}
		console.log(cart)
	    res.redirect("/cart");	
	});
});



module.exports = router;
