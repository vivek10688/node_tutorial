var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
	var pagedata = {title : "About Page", pagename : "about/index"};
	res.render("layout", pagedata);
});

router.post("/", function(req, res){
	console.log(req.body);
});


router.get("/save", function(req, res){
	console.log(req.query);
	res.send("hello world");
});
module.exports=router;