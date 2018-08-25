var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
	var db = client.db('project');
	db.collection('product').find().toArray(function(err, result){
		console.log(result);
	})
});