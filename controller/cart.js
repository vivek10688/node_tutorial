var express = require('express');
var router = express.Router();
var Mongo = require('mongodb');
var product = require('../model/product');

router.get("/add/:id", function(req, res){
	

	var id = req.params.id;
	var time = 1000*60*60*24;
	if(req.cookies.pid)
	{
		var oldid = req.cookies.pid;
		var newid = oldid+"#"+id;
		
		res.cookie('pid', newid, { expires: new Date(Date.now() + time), httpOnly: true });
	}
	else
	{
		res.cookie('pid', id, { expires: new Date(Date.now() + time), httpOnly: true });
	}
	var lasturl = req.header('Referer');
	
	res.redirect(lasturl);
});

router.get("/mycart", function(req, res){
	var result = [];
	if(req.cookies.pid)
	{
			var carStr = req.cookies.pid; 
			var arr = carStr.split("#");
			var newarr=[];

			arr.forEach(function(x){
				var obj = { _id : Mongo.ObjectId(x) };
				newarr.push(obj);
			});




			// console.log(newarr);
			product.findWhere({ $or : newarr}, function(err, result){
				result.forEach(function(x){
					x.total=0;
				});
				arr.forEach(function(x){
					// x= { _id : (5)}
					result.forEach(function(y){
						if(x == y._id)
						{
							y.total++;
						}
					});
				});
				
				//console.log(result);


				var pagedata = {title : "Your Cart", pagename : "cart/index", data : result};
				res.render("layout", pagedata);
		});
	}
	else
	{
		var pagedata = {title : "Your Cart", pagename : "cart/index", data : result};
		res.render("layout", pagedata);
	}
	
});


router.get('/clearcart', function(req, res){
	res.clearCookie("pid");
	res.redirect("/");
});


router.get("/removeitem/:id", function(req, res){
	var id = req.params.id;
	var time = 1000*60*60*24;
	var carStr = req.cookies.pid; 
	var arr = carStr.split("#");
	var n = arr.indexOf(id);
	arr.splice(n, 1);
	var newstr = arr.join("#");
	res.cookie('pid', newstr, { expires: new Date(Date.now() + time), httpOnly: true });
	res.redirect("/");
});

module.exports=router;