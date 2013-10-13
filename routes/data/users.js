var connection = require('../database');
var users = [
	{
		_id: 'krishna.tiwari@statcan.gc.ca',
		name: 'Krishna',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'pierre-louis.venne@statcan.gc.ca',
		name: 'Pierre-Louis',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'ralston.mckenzie@statcan.gc.ca',
		name: 'Ralston',
		role: 'user',
		league: 'statscan'
	},
	{
		_id: 'sunil.bajaj@aandc-aadnc.gc.ca',
		name: 'Sunil',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'vijay.sharm@gmail.com',
		name: 'Vijay',
		role: 'admin',
		league: 'statscan'
	}, 
];
exports.users = users;

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