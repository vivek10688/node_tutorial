var express = require('express');
var router = express.Router();
var category = require("../model/category");
var product = require("../model/product");
router.get('/', function(req, res){
	if(req.query.search)
	{
		var q = req.query.search;

		

		var searchStr = (new RegExp("^"+q+""));
		product.findWhere({ name : { $regex : searchStr }}, function(err, result){
			var productresult = result;
			category.find(function(err, result){
				var cateresult = result;
				var pagedata = {title : "Home Page", pagename : "home/index", catedata : cateresult, prodata : productresult};
				res.render("layout", pagedata);
			});
		});

	}
	else
	{

		product.find(function(err, result){
			var productresult = result;
			category.find(function(err, result){
				var cateresult = result;
				var pagedata = {title : "Home Page", pagename : "home/index", catedata : cateresult, prodata : productresult};
				res.render("layout", pagedata);
			});
		});

	}

	
});






// router.get("/:name/:id", function(req, res){
// 	// console.log(req.params);
// });
module.exports=router;