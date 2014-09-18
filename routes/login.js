var connection = require('./database');
var extract = require('./util').extract;
var ObjectID = require('mongodb').ObjectID;

var createuser = function( req, res ) {
	var body = req.body;
	var email = body.email;
	var role = body.role;
	var name = body.name;
	var league = body.league;

	if ( email ) {
		if ( role ) {
			if ( name ) {
				if ( league ) {
					var user = {
						_id: email,
						role: role,
						name: name,
						league: league
					};
					req.db.users().insert(user, function( err,result ) {
						if( err ) {
							res.json(500, {message: 'Failed to create user'});
						} else {
							res.json(200, {message: 'User created', user: user});
						}
					});
				} else {
					res.json(403, {message: 'League is required'});
				}
			} else {
				res.json(403, {message: 'Name is required'});
			}
		} else {
			res.json(403, {message: 'Role is required'});
		}
	} else {
		res.json(403, {message: 'Email is required'});
	}
};

var login = function( req, res ) {
	var body = req.body;
	var username = extract(req, 'email');

	if ( username ) {
		var usersdb = req.db.users();
		usersdb.findOne({_id: username.toLowerCase()}, function(err, user){
			if (err) {
				res.json(500, {message: 'Failed to get user'});
			} else {
				if ( user === null ) {
					res.json(403, {message: 'No user found'});
				} else {
					var sessionId = new ObjectID().toHexString();
					var query = {_id: user._id};
					var update = {$set:{session: sessionId}};
					var sort = [['email','1']];
					var options = {upsert:true, 'new':true};

					req.db.sessions().findAndModify(query, sort, update, options, function(err, session) {
						if ( err ) {
							res.json(403, {message: 'Failed to create session'});
						} else {
							res.json(200, {message:'logged in', sessionid: session.session, email: username});
						}
					});
				}
			}
		});
	} else {
		res.json(403, {message: 'Username is required'});
	}
};

var logout = function( req, res ) {
	var key = extract(req, 'sessionid');
	if ( key ) {
		req.db.sessions().remove({session: key}, function() {
			res.redirect('/');
		});
	} else {
		res.redirect('/');
	}
};

exports.authenticate = function( req, res, next ) {
	var key = extract(req, 'sessionid');
	var email = extract(req, 'email');
	if ( key ) {
		if ( email ) {
			email = email.toLowerCase();
			req.db.sessions().findOne({_id: email, session: key}, function(err, session) {
				if ( err || ! session) {
					res.json(401, {message: 'No Session found'});
				} else {
					req.db.users().findOne({_id: session._id}, function(err, user) {
						req.user = user;
						next();	
					});
				}
			});
		} else {
			res.json(403, {message: 'No email provided'});
		}
	} else {
		res.json(403, {message: 'No session ID provided'});
	}
};

function getDb( req, res, next ) {
	connection.getInstance(function(db) {
		req.db = db;
		res.on('finish', function() {
			req.db.close();
		});
		next();
	});
};

function checkApiKey( req, res, next ) {
	checkKey(req, res, next, 'apikey');
}

function checkKey( req, res, next, prop ) {
	var key = extract(req, prop);
	if ( key ) {
		var version = req.db.version();
		version.findOne(function(err, properties) {
			if (err) {
			 	res.json(500, {message: 'No API Key'});
			} else {
				if (properties[prop] && key && key === properties[prop]) {
					next();
				} else {
					res.json(403, {message: 'Invalid API Key'});
				}
			}
		});
	} else {
		res.json(403, {message: 'No API key given'});
	}
}

exports.install = function( app ) {
	app.post('/users', getDb, checkApiKey, createuser );
	app.post('/login', getDb, checkApiKey, login );
	app.get('/logout', getDb, logout );
};