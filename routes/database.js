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

exports.getInstance = function( callback ) {
	if ( process.env.MONGOLAB_URI ) {
		Db.connect( process.env.MONGOLAB_URI, function(err, db) {
			if( err ) throw err;
			callback(db);
		});
	} else {
		// mongodb://localhost/gezzoo
		var options = {safe: false, strict: true, fsync:true, journal:true};
		var db = new Db('apuesta', new Server('127.0.0.1', 27017, {}), options);
		db.open(function(err, db) {
			if( err ) throw err;
			callback(db);
		});
	}
};