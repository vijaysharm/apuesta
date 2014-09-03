var connection = require('./database');

function initialize(db, end) {
	var versiondb = db.version();
	var usersdb = db.users();

	var property = {
		version: 1.0,
		apikey: '525587c0194e6a020000021b',
		adminapikey: '53800a24cb5c036f70000003'
	};

	var admin = {
		_id: 'admin@email.com',
		role: 'admin',
		name: 'Admin',
		league: 'admin'
	};

	versiondb.insert(property,function(err,version) {
		if ( err ) throw err;
		usersdb.insert(admin, function(err, inserted) {
			end(db);
		});
	});
}

exports.execute = function( callback ) {
	var end = function(db) {
		callback();
	};

	connection.getInstance(function( db ) {
		var versiondb = db.version();
		versiondb.findOne(function(err,version) {
			if ( err ) throw err;
			if ( version === null ) {
				initialize
			(db, end);
			} else {
				end(db);
			}
		});
	});
};