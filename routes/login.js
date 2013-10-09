var users = require('./data/users');

var login = function( req, res ) {
	var b = req.body;
	users.findUser( b.username, function( user ) {
		if ( user === null ) {
			res.json({ error:'No user found' });
		} else {
			var sessionId = '12345';
			users.setSession( b.username, sessionId, function() {
				req.session.user = user;
				res.json(200, { user:'logged in' });
			});
		}
	});
};

var logout = function( req, res ) {
	if ( req.session.user ) {
		users.removeSession( req.session.user._id, function() {
			req.session.user = null;
			res.json(200, {user:'logged out'});
		});
	}
};

exports.authenticate = function( req, res, next ) {
	if( req.session.user ) {
		next();
	} else {
		res.json(401, {error:'User not found'});

		// TODO: For testing only. 
		// users.findUser('vijay.sharm@gmail.com', function( user ) {
		// 	req.session.user = user
		// 	next();
		// });
		// TODO: For testing only. 
	}
};

exports.install = function( app ) {
	app.post('/login', login );
	app.get('/logout', logout );
};