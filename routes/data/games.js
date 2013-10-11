var _ = require('underscore');
var connection = require('../database');

var computeOutcome = function( metadata,game ) {
	var outcomeagainstspread;
	if ( metadata && metadata.score && metadata.spread ) {
		var score = metadata.score;
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

var formatGamesByWeekResponse = function( teams, schedule, userpicks, gamedata, res ) {
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
			}
		};

		var metadata = _.find(gamedata,function(data) {
			return data.gameid === game.id;
		});

		var outcomeagainstspread;
		if ( metadata ) {
			data.score = metadata.score;
			data.spread = metadata.spread;
			data.date = metadata.date;
			outcomeagainstspread = computeOutcome(metadata,game);
		}

		var userpick = _.find(userpicks, function(pick) {
			return pick.gameid === game.id;
		});

		if ( userpick ) {
			data.pick = userpick.pick;
		}

		if ( outcomeagainstspread ) {
			data.winneragainstspread = outcomeagainstspread;
		}

		result.push( data );
	}

	res.json( result );
};

exports.getGamesByWeek = function( user, weekid, res ) {
	weekid = parseInt(weekid);
	connection.getInstance(function( db ) {
		var picksdb = db.collection('picks');
		var metadatadb = db.collection('metadata');
	
		picksdb.find({ userid:user._id, week:weekid }).toArray(function( err, userpicks ) {
			if ( err ) throw err;

			metadatadb.find({ week: weekid }).toArray(function( err, gamedata ) {
				if ( err ) throw err;

				var schedule = require('./schedule').getGamesByWeek(weekid);
				var teams = require('./teams').team;
				formatGamesByWeekResponse( teams, schedule, userpicks, gamedata, res );
			});
		});
	});
};

var formatGameByIdResponse = function( user, teams, game, picks, metadata, users, res ) {
	var data = {};
	if ( game ) {
		data = {
			id: game.id,
			week: game.week,
			home: {
				team: game.home,
				data: teams[game.home]
			},
			away: {
				team: game.away,
				data: teams[game.away]
			},
			previousgame: game.previous,
			nextgame: game.next
		};

		var outcomeagainstspread;
		if ( metadata ) {
			data.score = metadata.score;
			data.spread = metadata.spread;
			data.date = metadata.date;
			data.winneragainstspread = computeOutcome(metadata,game);
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
	}

	res.json(data);
};

exports.getGameById = function( user, game, res ) {
	var gameid = parseInt(game);
	var league = user.league;
	connection.getInstance(function( db ) {
		var picksdb = db.collection('picks');
		var usersdb = db.collection('users');
		var metadatadb = db.collection('metadata');
		usersdb.find({ league: league }).toArray(function(err,users) {
			if ( err ) throw err;
			picksdb.find({ gameid: gameid }).toArray(function(err, picks) {
				if ( err ) throw err;
				metadatadb.findOne({ gameid:gameid }, function(err,data) {
					var teams = require('./teams').team;
					var storedgame = require('./schedule').getGameById(gameid);
					formatGameByIdResponse( user, teams, storedgame, picks, data, users, res );
				});
			});
		});
	});
}

var formatPicksByWeekResponse = function( teams, schedule, users, picks, metadata, res ) {
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
				}
			};

			var gameinfo = _.find(metadata,function(info){
				return info.gameid === game.id;
			});

			var outcomeagainstspread = computeOutcome(gameinfo,game);

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

exports.getPicksByWeek = function( user, weekid, res ) {
	weekid = parseInt(weekid);
	var league = user.league;
	connection.getInstance(function( db ) {
		var picksdb = db.collection('picks');
		var usersdb = db.collection('users');
		var metadatadb = db.collection('metadata');
		usersdb.find({ league: league }).toArray(function(err,users) {
			if ( err ) throw err;
			picksdb.find({ week: weekid }).toArray(function(err, picks) {
				if ( err ) throw err;
				metadatadb.find({ week: weekid }).toArray(function(err, metadata) {				
					if ( err ) throw err;
					var teams = require('./teams').team;
					var schedule = require('./schedule').getGamesByWeek(weekid);
					formatPicksByWeekResponse( teams, schedule, users, picks, metadata, res );
				});
			});
		});
	});
};

exports.updatePickByGameId = function( user, gameid, weekid, pick, res ) {
	var gameid = parseInt(gameid);
	var weekid = parseInt(weekid);

	connection.getInstance(function( db ) {
		var picksdb = db.collection('picks');
		var update = pick ? {$set:{ pick:pick }} : {$unset:{ pick:'' }};
		var query = { gameid:gameid, week:weekid, userid:user._id };
		var sort = [['gameid','1']];
		var options = {upsert:true, 'new':true};
		picksdb.findAndModify(query, sort, update, options, function(err,userpick) {
			if (err) throw err;

			// TODO: Should return the updated object
			res.send(200);
		});
	});
};

var formatCommentsByGameIdResponse = function(users, comments, res) {
	var result = [];

	_.each(comments,function(comment){
		var user = _.find(users,function(user) {
			return user._id === comment.userid;
		});
		
		result.push({
			comment: comment.comment,
			gameid: comment.gameid,
			user: user.name,
			date: comment._id.getTimestamp()
		});
	});

	res.json(result);
};

exports.getCommentsByGameId = function(user, gameid, res) {
	var gameid = parseInt(gameid);
	var league = user.league;

	connection.getInstance(function( db ) {
		var commentsdb = db.collection('comments');
		var usersdb = db.collection('users');
		usersdb.find({ league: league }).toArray(function(err,users) {
			if ( err ) throw err;
			commentsdb.find({gameid:gameid}).toArray(function(err,comments) {
				if ( err ) throw err;
				formatCommentsByGameIdResponse(users,comments,res);
			});
		});
	});
};

var formatAddCommentsByGameIdResponse = function( comment, res ) {
	res.json(comment);
};

exports.addCommentByGameId = function( user, gameid, comment, res ) {
	var gameid = parseInt(gameid);
	var commentObject = {
		comment: comment,
		userid: user._id,
		gameid: gameid
	};

	connection.getInstance(function( db ) {
		var commentsdb = db.collection('comments');
		commentsdb.insert(commentObject,function(err,result) {
			if (err) throw err;
			var c = result[0];
			delete c.userid;
			c.user = user.name;
			formatAddCommentsByGameIdResponse(c,res);
		});
	});
};

exports.updateScores = function( scores, res ) {
	connection.getInstance(function( db ) {
		_.each(scores,function(score) {
			var metadatadb = db.collection('metadata');
			var gameid = parseInt(score.gameid);
			var update = score.score ? {$set:{ score: score.score }} : {$unset:{ score:'' }};
			var query = { gameid:gameid };
			var sort = [['gameid','1']];
			var options = { upsert:true, 'new':true };
			metadatadb.findAndModify(query, sort, update, options, function(err, storedspread) {
				if (err) throw err;

				// TODO: Should return the updated object
			});
		}, this);
	});
	res.send(200);
};

exports.updateSpreads = function( spreads, res ) {
	connection.getInstance(function( db ) {
		_.each(spreads, function(spread) {
			var metadatadb = db.collection('metadata');
			var gameid = parseInt(spread.gameid);
			var update = spread.spread ? {$set:{ spread: spread.spread }} : {$unset:{ spread:'' }};
			var query = { gameid:gameid };
			var sort = [['gameid','1']];
			var options = { upsert:true, 'new':true };
			metadatadb.findAndModify(query, sort, update, options, function(err, storedspread) {
				if (err) throw err;
			});
		}, this);
	});

	// TODO: Should return the updated object
	res.send(200);
};
