var _ = require('underscore');

exports.Schedule = function(year, week, type, games) {
	this.year = year;
	this.week = week;
	this.games = games;
	var me = this;
	return {
		getYear: function() {
			return me.year;
		},
		getWeek: function() {
			return me.week;
		},
		getThisWeeksGames: function() {
			var results = [];
			_.each(me.games, function(game) {
				results.push({
					id: game._id,
					home: game.home,
					away: game.away,
					week: game.week,
					year: game.year,
					date: game.date,
					score: game.score
				});
			});

			return results;
		},
		getGame: function( eid ) {
			var game = _.find(me.games, function(game) {
				return game._id === eid;
			});

			for ( var i = 0; i < me.games.length; i++ ) {
				var game = me.games[i];
				if ( game._id === eid ) {
					var prev = i === 0 ? (me.games.length - 1) : (i - 1);
					var next = i === (me.games.length - 1) ? 0 : (i + 1);

					prev = me.games[prev];
					next = me.games[next];

					return {
						id: game._id,
						home: game.home,
						away: game.away,
						week: game.week,
						year: game.year,
						date: game.date,
						score: game.score,
						previous: {
							id: prev._id,
							home: prev.home,
							away: prev.away
						},
						next: {
							id: next._id,
							home: next.home,
							away: next.away
						}
					};
				}
			}

			return null;
		}
	};
};
