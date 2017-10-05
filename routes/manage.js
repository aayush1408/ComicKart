var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Book = require('./model');

//managing the manage page
router.get('/',function(req,res,next){
	Book.find({}).exec(function(err,result){
		if(err){
			console.log('Error has occured');
		}
		else{
			console.log(result);
			res.render('manage', { result: result });
		}
	});	
   
});

router.get('/add',function(req,res,next){
    res.render('add');
});
//addbook
router.post('/addbook',function(req,res,next){
	var ids = req.body.ids;
    var title = req.body.title;
    var price = req.body.price;
    var description = req.body.description;
    var image = req.body.image;

    var newBook = new Book({
    	ids:ids,
    	title:title,
    	price:price,
    	description:description,
    	image:image
    });

    newBook.save(function(err)
    {
    	if(err) throw err;
    
    else
    {
    	console.log('Saved');
    	res.redirect('/');
    }
});
});
//delete
router.get('/delete/:id',function(req,res,next){
	Book.findOneAndRemove({ids:req.params.id},function(err){
		if(err){
			res.send('Error');
		}
		else{
			res.redirect('/manage');
		}
	});
});
  
//update
router.get('/edit/:id',function(req,res,next){

	Book.find({ids:req.params.id}).exec(function(err,result){
		if(err){
			console.log('Error has occured');
		}
		else{
			console.log(result);
			res.render('edit',{idse:req.params.ids , result:result });
			
		}
	});	

});

//Update data of books

router.post('/editbook/',function(req,res,next){
		var id = req.body.ids;

	Book.findOneAndRemove({ids:id},function(err){
		if(err){
			res.send('Error');
		}
	});

							
	Book.findOneAndUpdate({ids:id},
					{$set: {ids:req.body.ids,title:req.body.title,price:req.body.price,description:req.body.description,image:req.body.image}},
					{upsert:true},
					function(err,doc){
						if(err){
							console.log('Error in updation');
						}
						else{
							res.redirect('/manage');
						}
					});
		
	

});

module.exports = router;
