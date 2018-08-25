var express = require('express');
var router = express.Router();
var admin = require("../model/admin");

router.get('/', function(req, res){
	
	var pagedata = {title : "Admin Login", pagename : "admin/index", message : req.flash('msg')};
	res.render("admin_layout", pagedata);
});

router.get("/logout", function(req, res){
	req.session.destroy();
	res.redirect("/");
});

router.post("/", function(req, res){
	// console.log(req.body);
	var u = req.body.username;
	var p = req.body.password;
	admin.findWhere({username : u}, function(err, result){
		if(result.length==0)
		{
			req.flash("msg", "This Username and Password incorrect");
			res.redirect("/admin");
		}
		else
		{
			if(result[0].password==p)
			{
				req.session.adminid=result[0]._id;
				req.session.admin_name=result[0].name;
				req.session.is_admin_logged_in=true;
				res.redirect("/admin/dashboard");
			}
			else
			{
				req.flash("msg", "This Password incorrect");
				res.redirect("/admin");
			}
		}
	});



});





module.exports=router;

/*
MongoClient.connect(url, function(err, client){
		var db =  client.db(config.dbName);
		db.collection('admin').find({ username : u}).toArray(function(err, result){
			if(result.length==0)
			{
				req.flash("msg", "This Username and Password incorrect");
				res.redirect("/admin");
			}
			else
			{
				if(result[0].password==p)
				{
					req.session.adminid=result[0]._id;
					req.session.admin_name=result[0].name;
					req.session.is_admin_logged_in=true;
					res.redirect("/admin/dashboard");
				}
				else
				{
					req.flash("msg", "This Password incorrect");
					res.redirect("/admin");
				}
			}
		});


*/