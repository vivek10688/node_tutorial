var connection = require('../config/connect');
var config = require('../config/db');

module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('admin').find(obj).toArray(cb);
	});
}
