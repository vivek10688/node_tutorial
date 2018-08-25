var express = require('express');
var router = express.Router();
var product = require('../model/product');
var Mongodb = require('mongodb');
var category = require("../model/category");
router.get("/", function(req, res){

	product.find(function(err, result){
		category.find(function(err, result1){
			var pagedata = { title : "View Category", pagename : "admin/view_product", data : result, catdata : result1};
			res.render("admin_layout", pagedata);
		})
		// console.log(result);
		
	});
	// product.findGetCate(function(err, result){
	// 	console.log(result);
	// })


	
});

router.get("/delete/:id", function(req, res){
	// console.log(req.query);
	console.log(req.params);
	// res.send("delete");
	product.remove({ _id : Mongodb.ObjectId(req.params.id) }, function(err, result){
		console.log(result);
		res.redirect('/admin/view_product');
	});

});

router.get("/update/:id", function(req, res){
	console.log(req.query);
	console.log(req.params);
	var id = req.params.id;
	res.send("delete");
	product.findWhere({ _id : Mongodb.ObjectId(req.params.id) }, function(err, result){
		var prodata=result[0];
		// console.log(result);
		category.find(function(err, result){
			var pagedata = { title : "Update Product", pagename : "admin/update_product", prodata : prodata, catedata : result};
			res.render("admin_layout", pagedata);
		});
		
	});


});

// ObjectId()

module.exports=router;