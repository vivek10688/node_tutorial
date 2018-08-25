var express = require('express');
var router = express.Router();

var stu = require("../model/stu");


router.get('/', function(req, res){
	
	
	res.render("demo/index");
});

router.post("/", function(req, res){
	stu.insert(req.body, function(err, result){
		console.log(result);
		res.redirect('/demo');
	});
});

router.get('/show', function(req, res){
	stu.find(function(err, result){
		// console.log(result);
		var pagedata = { data : result};
		res.render('demo/show', pagedata);
	});
});
module.exports=router;