var login = require('./login');
var games = require('./data/games');
var impl = require('./data/impl');
var thescore = require('./data/thescore');
var connection = require('./database');

var checkAdmin = function( req, res, next ) {
	var role = req.user.role;
	if ( role === 'admin')
		next();
	else
		res.json(403, {message:'not admin'});
};

var getGames = function( req, res ) {
	games.getGamesByWeek(req, res);
};

var getGame = function( req, res ) {
	games.getGame( req, res );
};

var getPicks = function( req, res ) {
	games.getPicksByLeague( req, res );
};

var updatePick = function( req, res ) {
	games.updatePickByGameId(req, res);
};

var updateSpreads = function( req, res ) {
	games.updateSpreads(req,res);
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

exports.install = function( app ) {
	app.get(
		'/api/games/:year/:week',
		getDb,
		login.authenticate,
		// impl.fetchGames,
		thescore.fetchGames,
		getGames
	);
	app.get(
		'/api/games/:year/:week/:gameid',
		getDb,
		login.authenticate,
		// impl.fetchGames,
		thescore.fetchGames,
		getGame
	);
	app.get(
		'/api/picks/:year/:week',
		getDb,
		login.authenticate,
		// impl.fetchGames,
		thescore.fetchGames,
		getPicks
	);
	app.post(
		'/api/picks/:year/:week/:gameid',
		getDb,
		login.authenticate,
		// impl.fetchGames,
		thescore.fetchGames,
		updatePick
	);
	app.post(
		'/api/admin/spreads/:year/:week',
		getDb,
		login.authenticate,
		checkAdmin,
		// impl.fetchGames,
		thescore.fetchGames,
		updateSpreads
	);
};