var _ = require('underscore');
var connection = require('../database');
var extract = require('../util').extract;

var computeOutcome = function(metadata, game) {
	var outcomeagainstspread;
	if ( metadata && metadata.spread && game.score ) {
		var score = game.score;
		var spread = metadata.spread;

		var scorediff = score.home - score.away;
		var diff = Math.abs(scorediff) - Math.abs(spread);
		if ( spread >= 0 ) {
			// home expected to win
			if ( scorediff >= 0 && diff >= 0 ) {
				outcomeagainstspread = game.home;
			} else {
				outcomeagainstspread = game.away;
			}
		} else {
			// away expected to win
			if ( scorediff < 0 && diff > 0 ) {
				outcomeagainstspread = game.away;
			} else {
				outcomeagainstspread = game.home;
			}
		}
	}

	return outcomeagainstspread;
};

var formatGamesByWeekResponse = function( teams, schedule, userpicks, spreads, res ) {
	var result = [];
	for ( var g in schedule ) {
		var game = schedule[g];
		var data = {
			id: game.id,
			home: { 
				team: game.home,
				data: teams[game.home]
			},
			away: {
				team: game.away,
				data: teams[game.away]
			},
			score: game.score,
			date: game.date
		};

		var userpick = _.find(userpicks, function(pick) {
			return pick.gameid === game.id;
		});

		if ( userpick ) {
			data.pick = userpick.pick;
		}

		var spread = _.find(spreads, function(spread) {
			return spread.gameid === game.id;
		});
		
		if ( spread ) {
			data.spread = spread.spread;
		}

		var outcomeagainstspread = computeOutcome(spread, game);
		if ( outcomeagainstspread ) {
			data.winneragainstspread = outcomeagainstspread;
		}

		result.push( data );
	}

	res.json( result );
};

exports.getGamesByWeek = function( req, res ) {
	var picksdb = req.db.picks();
	var spreadsdb = req.db.spreads();
	var user = req.user;
	var year = req.schedule.getYear();
	var week = req.schedule.getWeek();

	var query = {
		userid:user._id,
		week: week,
		year: year		
	};

	picksdb.find(query).toArray(function( err, userpicks ) {
		if ( err ) {
			res.json(500, {message: 'Failed to get picks'});
		} else {
			var query = {
				week: week,
				year: year		
			};
			spreadsdb.find(query).toArray(function(err, spreads) {
				if ( err ) {
					res.json(500, {message: 'Failed to get spreads'});
				} else {
					var teams = require('./teams').team;
					var schedule = req.schedule.getThisWeeksGames();
					formatGamesByWeekResponse( teams, schedule, userpicks, spreads, res );					
				}
			});
		}
	});
};

var formatGameByIdResponse = function( user, teams, game, picks, spread, users, res ) {
	var data = {};
	if ( game ) {
		data = {
			id: game.id,
			week: game.week,
			year: game.year,
			home: {
				team: game.home,
				data: teams[game.home]
			},
			away: {
				team: game.away,
				data: teams[game.away]
			},
			previousgame: game.previous,
			nextgame: game.next,
			user: {
				id: user._id,
				name: user.name
			},
			score: game.score,
			date: game.date
		};

		if ( spread ) {
			data.spread = spread.spread;
		}

		var outcomeagainstspread = computeOutcome(spread, game);
		if ( outcomeagainstspread ) {
			data.winneragainstspread = outcomeagainstspread;
		}

		data.picks = [];
		_.each(users, function(user) {
			var userpick = _.find(picks, function(pick) {
				return pick.userid === user._id;
			});

			var p = {
				user: {
					id: user._id,
					name: user.name
				},
				pick: ( userpick ? userpick.pick : '' )
			};

			data.picks.push(p);
		});

		res.json(data);
	} else {
		res.json(404, {message: 'Game Not Found'});
	}
};

exports.getGame = function( req, res ) {
	var user = req.user;
	var gameid = extract(req, 'gameid');
	var league = user.league;

	var picksdb = req.db.picks();
	var usersdb = req.db.users();
	var metadatadb = req.db.spreads();
	var week = req.schedule.getWeek();
	var year = req.schedule.getYear();
	var query = {week: week, year: year, gameid:gameid};

	usersdb.find({ league: league }).toArray(function(err,users) {
		if ( err ) {
			res.json(500, {message: 'Failed to get users'});
		} else {
			picksdb.find(query).toArray(function(err, picks) {
				if ( err ) {
					res.json(500, {message: 'Failed to get picks'});
				} else {
					metadatadb.findOne(query, function(err,data) {
						if ( err ) {
							res.json(500, {message: 'Failed to get spreads'});
						} else {
							var teams = require('./teams').team;
							var storedgame = req.schedule.getGame(gameid);
							formatGameByIdResponse( user, teams, storedgame, picks, data, users, res );
						}
					});
				}
			});
		}
	});
}

var formatPicksByWeekResponse = function( teams, schedule, users, picks, spreads, res ) {
	var result = {};
	if ( schedule ) {
		var leagueusers = [];
		_.each( users, function(user){
			leagueusers.push({
				id: user._id,
				name: user.name
			});
		});
		result.users = leagueusers;

		var allpicks = [];
		_.each(schedule, function( game ) {
			var data = {
				id: game.id,
				home: { 
					team: game.home,
					data: teams[game.home]
				},
				away: {
					team: game.away,
					data: teams[game.away]
				},
				score: game.score,
				date: game.date
			};

			var spread = _.find(spreads,function(spread){
				return spread.gameid === game.id;
			});

			var outcomeagainstspread = computeOutcome(spread,game);

			data.picks = [];
			_.each(users, function(user) {
				var userpick = _.find(picks, function(pick) {
					return pick.userid === user._id && pick.gameid === game.id;
				});
				var p = {
					user: user._id,
					pick: ( userpick ? userpick.pick : '' )
				};

				if ( outcomeagainstspread ) {
					p.winneragainstspread = outcomeagainstspread;
				}

				data.picks.push(p);
			});
			allpicks.push(data);
		});

		result.games = allpicks;
	}
	res.json(result);
};

exports.getPicksByLeague = function( req, res ) {
	var user = req.user;
	var league = user.league;
	var picksdb = req.db.picks();
	var usersdb = req.db.users();
	var spreadsdb = req.db.spreads();
	var week = req.schedule.getWeek();
	var year = req.schedule.getYear();

	usersdb.find({ league: league }).toArray(function(err,users) {
		if ( err ) throw err;
		picksdb.find({ week: week, year: year }).toArray(function(err, picks) {
			if ( err ) throw err;
			spreadsdb.find({ week: week, year: year }).toArray(function(err, spreads) {				
				if ( err ) throw err;
				var teams = require('./teams').team;
				var schedule = req.schedule.getThisWeeksGames();
				formatPicksByWeekResponse( teams, schedule, users, picks, spreads, res );
			});
		});
	});
};

exports.updatePickByGameId = function( req, res ) {
	var pick = extract(req, 'pick');
	var gameid = extract(req, 'gameid');
	var user = req.user;
	var game = req.schedule.getGame(gameid);
	if ( game ) {
		var picksdb = req.db.picks();
		var week = game.week;
		var year = game.year;
		var update = pick ? {$set:{ pick:pick }} : {$unset:{ pick:'' }};
		var query = { gameid:gameid, week: week, year: year, userid:user._id };
		var sort = [['gameid','1']];
		var options = {upsert:true, 'new':true};
		picksdb.findAndModify(query, sort, update, options, function(err, userpick) {
			if (err) {
				res.json(500, {message: 'Failed to save pick'});
			} else {
				// var eventsdb = db.collection('events');
				// query = pickevent = { gameid:[gameid], userid:user._id, type:'pick' };
				// update = pick ? {$set:{ pick:pick }} : {$unset:{ pick:'' }};
				// sort = [['gameid','1']];
				// options = {upsert:true, 'new':true};
				// eventsdb.findAndModify(query, sort, update, options,function(err,e) {});

				// TODO: Should return the updated object
				res.json(200, userpick);
			}
		});
	} else {
		res.json(400, {message: 'Game ID not part of given week'});
	}
};

exports.updateSpreads = function( req, res ) {
	var spreads = extract(req, 'spreads');
	console.log(spreads);
	if ( spreads ) {
		var result = [];
		_.each(spreads, function(spread) {
			var metadatadb = req.db.spreads();
			var gameid = spread.gameid;
			var game = req.schedule.getGame(gameid);

			if ( game ) {
				var query = { gameid:gameid, week: game.week, year: game.year };
				var update = spread.spread ? {$set:{ spread: spread.spread }} : {$unset:{ spread:'' }};
				var sort = [['gameid','1']];
				var options = {upsert: true, 'new': true};
				console.log(query);
				console.log(update);
				metadatadb.findAndModify(query, sort, update, options, function(err, storedspread) {
					if ( err ) {
						console.log('Failed ' + err);
					}
					else {
						console.log(storedspread);
						result.push(storedspread);
					}
				});
			} else {
				console.log('no game found ' + gameid);
			}
		}, this);

		// var games = _.pluck(spreads,'gameid');
		// var eventsdb = db.collection('events');
		// var query = pickevent = { gameid:[gameid], userid:user._id, type:'spread' };
		// var update = pick ? {$set:{ pick:pick }} : {$unset:{ pick:'' }};
		// var sort = [['gameid','1']];
		// var options = {upsert:true, 'new':true};
		// eventsdb.findAndModify(query, sort, update, options,function(err,e) {});		

		// TODO: Should return the updated object
		res.send(200, result);
	} else {
		res.json(400, {message: 'Spreads not provided'});
	}
};
