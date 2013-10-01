var schedule = require('./schedule');
var teams = require('./teams').team;
var picks = require('./picks');
var metadata = require('./gamesmetadata');

exports.getGamesByWeek = function( user, week ) {
	var games = schedule.getGamesByWeek(week);
	var result = [];

	if ( !games )
		return result;

	var userPick = picks.getPicks(user, week);
	for ( var g in games ) {
		var game = games[g];
		var gameInfo = metadata.getMetadataByGame(game.id);

		var data = {
			id: game.id,
			home: { 
				team: game.home,
				data: teams[game.home]
			},
			away: {
				team: game.away,
				data: teams[game.away]
			}
		};

		if ( userPick ) {
			data.pick = userPick[game.id];
		}

		if ( gameInfo ) {
			data.score = gameInfo.score;
			data.spread = gameInfo.spread;
		} else {
			console.log( 'nothing found for ' + game.id );
		}

		result.push( data );
	}

	return result;
}

exports.findGame = function() {
	// for ( game in games ) {
	// 	var test = games[game];
	// 	if ( ( test.player1 === username || test.player2 === username ) && 
	// 		 ( test.id === gameId ) ) {
	// 		return games[game];
	// 	}
	// }

	return null;
}

