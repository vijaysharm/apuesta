var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/apuesta';
exports.getInstance = function( callback ) {
	mongo.Db.connect( mongoUri, function( err, db ) {
		if( err ) throw err;
		callback( db );
	});
};