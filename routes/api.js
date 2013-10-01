var login = require('./login');
var games = require('./data/games');

var getGamesByWeek = function( req, res ) {
	var week = req.params.id;
	res.json(games.getGamesByWeek( req.session.user, week ));
};

// var getGame = function( req, res ) {
// 	var username = req.session.user.username;
// 	var gameId = parseInt( req.params.id );
// 	var userGames = games.findGame( username, gameId );
// 	res.json( JSON.stringify(userGames) );
// };

exports.install = function( app ) {
	app.get( '/api/week/:id', login.authenticate, getGamesByWeek );
	// app.get( '/games/:id', login.authenticate, getGame );
};