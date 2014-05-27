// var mongo = require('mongodb');
// var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/apuesta';
// exports.getInstance = function( callback ) {
// 	mongo.Db.connect( mongoUri, function( err, db ) {
// 		if( err ) throw err;
// 		callback( db );
// 	});
// };

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var wrapdb = function( db ) {
	return {
		users: function() {
			return db.collection('users');
		},
		picks: function() {
			return db.collection('picks');
		},
		spreads: function() {
			return db.collection('metadata');
		},
		sessions: function() {
			return db.collection('sessions');
		},
		schedule: function() {
			return db.collection('schedule');
		},
		version: function() {
			return db.collection('properties');
		},
		close: function() {
			db.close();
		}
	};
};

exports.getInstance = function( callback ) {
	if ( process.env.MONGOLAB_URI ) {
		Db.connect( process.env.MONGOLAB_URI, function(err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	} else {
		// mongodb://localhost/gezzoo
		var options = {safe: false, strict: true, fsync:true, journal:true};
		var db = new Db('apuesta', new Server('127.0.0.1', 27017, {}), options);
		db.open(function(err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	}
};