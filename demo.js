var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var cache = require("nocache");
var upload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(flash());
app.use(cache());
app.use(upload());


app.use(function(req, res, next){
	// console.log(req.cookies);
	res.locals.session=req.session;
	next();
});

app.use(require("./controller/default"));
app.get("/", function(req, res){
	//res.cookie("name", "rohit");
	//res.send("Home Page");
});
var count=1;
app.get("/set/:c", function(req, res){
	// console.log(req.params);
	console.log(req.cookies);
	res.cookie('newname', count, { expires: new Date(Date.now() + 900000), httpOnly: true });
	count++;
	// if(req.cookies.name)
	// {
	// 	var a = req.cookies.name;
	// 	var b = a+","+req.params.c;
	// 	res.cookie("name", b, { expires: new Date(Date.now() + 3600)});
	// }
	// else
	// {
	// 	res.cookie("name", req.params.c, { expires: new Date(Date.now() + 3600)});
	// }
	res.send("Set Page");
});
app.get('/clear', function(req, res){
	res.clearCookie("name");
	res.send("clear page");
});


app.listen(process.env.PORT || 3000, function(){
	console.log("Server Running");
});

