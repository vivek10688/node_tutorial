var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	
	res.render("val/index");
});

router.get('/show', function(req, res){
	
	res.render("val/show");
});
router.get('/image', function(req, res){
	
	res.render("val/image");
});
router.get('/slider', function(req, res){
	
	res.render("val/slider");
});

router.get('/map', function(req, res){
	
	res.render("val/map");
});

router.post("/", function(req, res){
	console.log(req.body);
});

module.exports=router;