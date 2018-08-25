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
	var total = 0;
	if(req.cookies.pid)
	{
		var carStr = req.cookies.pid; // 5#12#20#11
		var arr = carStr.split("#");
		total = arr.length;
	}
	res.locals.cartTotal = total;
	res.locals.session=req.session;
	next();
});

app.use(require("./controller/default"));    



app.listen(process.env.PORT || 3000, function(){
	console.log("Server Running");
});

