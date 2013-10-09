var login = require('./login');
var games = require('./data/games');

var checkAdmin = function( req, res, next ) {
	var role = req.session.user.role;
	if ( role === 'admin')
		next();
	else
		res.json({ error:'not admin' });
};

var getGamesByWeek = function( req, res ) {
	var week = req.params.id;
	games.getGamesByWeek( req.session.user, week, res );
};

var getGameById = function( req, res ) {
	var gameId = req.params.id;
	games.getGameById( req.session.user, gameId, res );
};

var getPicksByWeek = function( req, res ) {
	var week = req.params.id;
	games.getPicksByWeek( req.session.user, week, res );
};

var updatePick = function( req, res ) {
	var pick = req.body.pick;
	var gameid = req.body.gameid;
	var weekid = req.body.week;
	games.updatePickByGameId( req.session.user, gameid, weekid, pick, res );
};

var updateSpreads = function( req, res ) {
	var spreads = req.body.spreads;
	games.updateSpreads(spreads,res);
};

var updateScores = function( req, res ) {
	var scores = req.body.scores;
	games.updateScores(scores,res);
};

var getCommentsByGameId = function( req, res ) {
	var gameid = req.params.id;
	var user = req.session.user;
	games.getCommentsByGameId(user, gameid, res);
};

var addCommentsByGameId = function( req, res ) {
	var gameid = req.body.gameid;
	var user = req.session.user;
	var comment = req.body.comment;
	games.addCommentByGameId(user, gameid, comment, res);
};

exports.install = function( app ) {
	app.get( '/api/weeks/:id', login.authenticate, getGamesByWeek );
	app.get( '/api/games/:id', login.authenticate, getGameById );
	app.get( '/api/picks/:id', login.authenticate, getPicksByWeek );
	app.post( '/api/picks', login.authenticate, updatePick );
	app.get( '/api/comments/:id', login.authenticate, getCommentsByGameId );
	app.post( '/api/comments', login.authenticate, addCommentsByGameId );

	app.get( '/api/admin/weeks/:id', login.authenticate, checkAdmin, getGamesByWeek );
	app.post( '/api/admin/scores', login.authenticate, checkAdmin, updateScores );
	app.post( '/api/admin/spreads', login.authenticate, checkAdmin, updateSpreads );
};