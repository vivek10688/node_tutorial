var express = require('express');
var router = express.Router();
// var chache = require('chache');



router.use("/", require("./home"));


router.use("/cart", require("./cart"));
router.use("/val", require("./val"));




router.use("/category", require("./category"));
router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/about", require("./about"));
router.use("/user", backdoor, require("./user"));
router.use('/profile', backdoor, require('./profile'));

router.use("/logout", require("./logout"));

/* This is admin panel coading ------------*/
router.use('/cpanel', adminProtactor, require('./adminlogin'))
router.use("/admin/dashboard", backdoor_admin, require("./admindash"))
router.use("/admin/add_category", backdoor_admin, require("./adminaddcategory"))
router.use("/admin/view_category", backdoor_admin, require("./adminviewcategory"))
router.use("/admin/add_product", backdoor_admin, require("./adminaddproduct"))
router.use("/admin/view_product", backdoor_admin, require("./adminviewproduct"))


// router.use("/user", chache, require("./"))

function backdoor(req, res, next)
{
	if(! req.session.is_user_logged_in)
	{
		res.redirect("/login");
	}
	next();
}
function backdoor_admin(req, res, next)
{
	if(! req.session.is_admin_logged_in)
	{
		res.redirect("/");
	}
	next();
}
function adminProtactor(req, res, next)
{
	if(req.session.is_admin_logged_in)
	{
		res.redirect("/admin/dashboard");
	}
	next();
}

module.exports=router;