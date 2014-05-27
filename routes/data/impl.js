var _ = require('underscore');
var connection = require('../database');
var http = require('http');
var parseString = require('xml2js').parseString;
var extract = require('../util').extract;
var Schedule = require('./schedule').Schedule;

function checkResult(result) {
	if ( result )
		if ( result.ss )
			if ( result.ss.gms ) 
				if ( result.ss.gms[0] )
					if ( result.ss.gms[0].g )
						if (result.ss.gms[0].g.length !== 0) {
							return null;
						}
						else
							return {message: 'FAIL lenght: ' + result.ss.gms[0].g.length};
					else
						return {message: 'FAIL No g segment found'};
				else
					return {message: 'FAIL No gms[0] segment found'};
			else
				return {message: 'FAIL No gms segment found'};
		else
			return {message: 'FAIL No ss segment found'};
	else
		return {message: 'FAIL No result segment found: '};
}

function update(req, res, next, result) {
	var check = checkResult(result);

	if ( check ) {
		res.json(500, check);
	} else {
		var games = [];

		var year = result.ss.gms[0].$.y;
		var week = result.ss.gms[0].$.w;
		_.each(result.ss.gms[0].g, function(g) {
			var eid = g.$.eid;
			var month = eid.substr(4, 2);
			var day = eid.substr(6, 2);
			var time = g.$.t;
			var hours = time.substring(0, time.indexOf(":"));
			var minutes = time.substr(time.indexOf(":")+1, 2);
			var date = new Date(year, month - 1, day, hours, minutes, 0, 0);
			var state = g.$.q === 'F' ? 'final' : 'pending';

			var hasScore = g.$.vs && g.$.hs;
			var score = {
				away: g.$.vs,
				home: g.$.hs,
			};

			var game = {
				_id: g.$.eid,
				home: g.$.h,
				away: g.$.v,
				year: year,
				week: week,
				type: g.$.gt,
				date: date,
				state: state,
				score: hasScore ? score : undefined
			};
			games.push(game);
		});

		req.schedule = new Schedule(year, week, games);
		next();
	}
}

exports.fetchGames = function(req, res, next) {
	var user = req.user;
	var year = extract(req, 'year');
	var week = extract(req, 'week');
	var type = extract(req, 'type');

	var options = {
		host: 'www.nfl.com',
		path: '/ajax/scorestrip?season=' + year + "&week=" + week + "&seasonType=" + type
	};

	http.get(options, function(resp) {
		var xml = '';
		resp.on('data', function(chunk) {
			xml += chunk;
		});
		resp.on('end', function() {
			parseString(xml, function (err, result) {
				update(req, res, next, result);
    		});
		});
	}).on('error', function(e) {
  		res.json(500, {message: e});
	});
};
