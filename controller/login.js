var express = require('express');
var router = express.Router();
var user = require("../model/user");


router.get('/', function(req, res){

	var pagedata = {title : "Login Page", pagename : "login/index", message : req.flash('msg')};
	res.render("layout", pagedata);
});

router.post("/", function(req, res){
	var u = req.body.username;
	var p = req.body.password;
	user.findWhere({username : u}, function(err, result){
		if(result.length==0) // rusername incorrect
		{
			req.flash("msg", "This Username and Password Incorrect");
			res.redirect("/login");
		}
		else
		{
			var data = result[0];
			if(data.password == p)
			{
				req.session.userid = data._id;
				req.session.full_name = data.full_name;
				req.session.is_user_logged_in=true;
				res.redirect('/');
			}
			else
			{
				req.flash("msg", "Password is Incorrect");
				res.redirect('/login');
			}
		}
	});
	

});
module.exports=router;