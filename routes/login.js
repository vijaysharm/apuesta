var users = require('./data/users');

var login = function( req, res ) {
	var b = req.body;
	var user = users.findUser( b.username );
	if ( user === null ) {
		res.json({error:'No user found'});
	} else {
		req.session.user = user;
		res.json(200, {user:'logged in'});
	}
};

var logout = function( req, res ) {
	req.session.user = null;
	res.json(200, {user:'logged out'});
};

exports.authenticate = function( req, res, next ) {
	if( req.session.user ) {
		next();
	} else {
		// res.json(401, {error:'User not found'});

		// TODO: For testing only. 
		req.session.user = users.findUser('vijay.sharm@gmail.com');
		next();
		// TODO: For testing only. 
	}
};

exports.install = function( app ) {
	app.post('/login', login );
	app.get('/logout', logout );
};