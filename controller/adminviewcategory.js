var express = require('express');
var router = express.Router();
var category = require('../model/category');
var Mongo = require("mongodb");

router.get("/", function(req, res){

	category.find(function(err, result){
		// console.log(result);
		var pagedata = { title : "View Category", pagename : "admin/view_category", data : result};
		res.render("admin_layout", pagedata);
	});


	
});

router.get('/edit/:id', function(req, res){
	// console.log(req.params);
	// var id = req.params.id;
	category.findWhere({ _id : Mongo.ObjectId(req.params.id)}, function(err, result){
		// console.log(result);
		var pagedata = { title : "Update Category", pagename : "admin/update_category", data : result[0]};
		res.render("admin_layout", pagedata);
	});
	
});



module.exports=router;