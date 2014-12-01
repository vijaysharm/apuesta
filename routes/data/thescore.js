var _ = require('underscore');
var connection = require('../database');
var http = require('http');
var extract = require('../util').extract;
var Schedule = require('./schedule').Schedule;
var moment = require('moment-timezone');

function constainsSpread(value) {
	var check = '-';
	return value.slice(0, check.length) == check;
}

function pickSpread(odd) {
	if (odd) {
		if (constainsSpread(odd.away_odd)) {
			return odd.away_odd;
		} else {
			return odd.home_odd.slice(1, odd.home_odd.length);
		}
	} else {
		return null;
	}
}

function update(req, res, result) {
	console.log(result);

	var games = [];
	_.each(result, function(parsed) {
		var type = parsed.game_type === 'Regular Season' ? 'REG' : 'PRE'
		var date = moment(parsed.game_date);
		var state = parsed.status === 'final' ? 'final' : 'pending';
		var hasScore = parsed.box_score != null && parsed.status === 'final';
		var score = {};
		if ( hasScore ) {
			score.home = parsed.box_score.score.home.score;
			score.away = parsed.box_score.score.away.score;
		}

		if (!parsed.id) {
			console.log(parsed);
		}

		var game = {
			_id: parsed.id.toString(),
			home: parsed.home_team.abbreviation.toString(),
			away: parsed.away_team.abbreviation.toString(),
			year: date.year().toString(),
			week: parsed.week.toString(),
			type: type.toString(),
			date: date.toISOString(),
			state: state,
			score: hasScore ? score : undefined
		};
		games.push(game);

		var query = {_id: game._id};
		var update = game;
		var sort = [['gameid','1']];
		var options = {upsert:true, 'new':true};

		req.db.schedule().findAndModify(query, sort, update, options, function(err) {
			// do nothing.
		});

		var gameid = game._id;
		var spread = pickSpread(parsed.odd);
		var week = game.week;
		var year = game.year;

		var query = { gameid:gameid, week: week, year: year };
		var update = spread ? {$set:{ spread: spread }} : {$unset:{ spread:'' }};
		var sort = [['gameid','1']];
		var options = {upsert: true, 'new': true};

		// console.log(game);
		// console.log({game:gameid, spread:spread});
		req.db.spreads().findAndModify(query, sort, update, options, function(err, storedspread) {
			// move on
		});
	});

	return games;
}

// https://api.thescore.com/nfl/events?week=2014-15
exports.fetchGames = function (req, res, next) {
	var user = req.user;
	var year = extract(req, 'year');
	var week = extract(req, 'week');
	var type = extract(req, 'type');

	// TODO: Needs to support pre/post -season
	var options = {
		host: 'api.thescore.com',
		path: '/nfl/events?week=' + year + "-" + week
	};

	http.get(options, function(resp) {
		var rawJson = '';
		resp.on('data', function(chunk) {
			rawJson += chunk;
		});
		resp.on('end', function() {
			var games = update(req, res, JSON.parse(rawJson));
			req.schedule = new Schedule(year, week, type, games);
			next();
		});
	}).on('error', function(e) {
		var query = {
			year: year,
			week: week,
			type: type
		};

		req.db.schedule().find(query).toArray(function(err, games) {
			if ( err ) {
				res.json(500, {message: e});
			} else if ( games.length === 0 ) {
				res.json(500, {message: 'No games found'});
			} else {
				req.schedule = new Schedule(year, week, type, games);
				next();
			}
		});
	});	
};