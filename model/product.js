var connection = require("../config/connect");
var config = require("../config/db");
var mongo = require('mongodb');

module.exports.insert=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').insert(obj, cb);
	});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').find().toArray(cb);
	});
}

module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').find(obj).toArray(cb);
	});
}
module.exports.remove=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').remove(obj, cb);
	});

}
module.exports.update=function(where, obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').update(where, {$set : obj}, cb);
	});

}

module.exports.findGetCate=function(cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('product').aggregate({ $lookup : { from : "category", localField : new mongo.ObjectId('$category'), foreignField : "_id", as : "catedata" }},cb);
	});
}
