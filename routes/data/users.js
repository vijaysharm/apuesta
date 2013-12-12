var connection = require('../database');

exports.findUser = function( username, callback ) {
	connection.getInstance(function( db ) {
		var usersdb = db.collection('users');
		usersdb.findOne({ _id:username }, function(err, user){
			if (err) throw err;
			callback(user);
		});
	});
};

exports.setSession = function( username, sessionId, callback ) {
	// connection.getInstance( function( db ) {
	// 	var userdata = db.collection('userdata');
	// 	usersdb.insert({_id:username, sessionid:sessionId}, function(err, result) {
	// 		if ( err ) throw err;
			callback();
	// 	});
	// });
}

exports.removeSession = function( username, callback ) {
	// connection.getInstance( function( db ) {
	// 	var userdata = db.collection('userdata');
		// usersdb.insert({_id:username, sessionid:''}, function(err, result){
		// 	if ( err ) throw err;
			callback();
		// });
	// });
}