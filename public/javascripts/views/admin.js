define([
	'underscore',
	'backbone',
	'moment',
	'utils'
], function(_, Backbone, moment, Utils) {
	var ScoreView = Backbone.View.extend({
		className: 'col-md-12 score-form',
		events: {
			'click button.submit-score': 'handleSubmitScore'
		},
		handleSubmitScore: function(e) {
			var games = $(e.target).closest('div.score-form').find('.input-scores');
			var scores = [];
			_.each(games, function(game) {
				var $game = $(game);
				var gameid = $game.attr('id').match(/[0-9]+/);
				var homescore = $game.find('.input-home').first().val();
				var awayscore = $game.find('.input-away').first().val();

				var home = homescore === '' ? undefined : parseInt(homescore);
				var away = awayscore === '' ? undefined : parseInt(awayscore);

				var score = {
					gameid: parseInt(gameid),
				};

				if ( home ) {
					score.score = score.score || {};
					score.score.home = home;
				}

				if ( away ) {
					score.score = score.score || {};
					score.score.away = away;
				}

				scores.push(score);
			}, this);

			this.trigger('save-score',scores);
		},
		render: function() {
			var title = $('<h4>').text('Input Scores');
			this.$el.append($('<div>',{'class': 'row'}).append(title).append($('<br>')));

			this.collection.each( function( game ) {
				this.$el.append(this.row(game));
			}, this );

			var saveButton = $('<button>', {'class': 'btn btn-default submit-score', text:'Save Scores'});
			this.$el.append($('<div>',{'class': 'row'}).append(saveButton));

			return this;
		},
		row: function( game ) {
			var away = game.get('away');
			var home = game.get('home');
			var score = game.get('score');
			var id = game.get('id');

			var r = $('<div>', {'class': 'row input-scores', 'id': 'gameid' + id});
			var homescoreinput = $('<input>', {'class': 'form-control input-home', id: home.team, placeholder: home.team, type:'number'});
			var awayscoreinput = $('<input>', {'class': 'form-control input-away', id: away.team, placeholder: away.team, type:'number'});

			if ( score ) {
				homescoreinput.val(score.home);
				awayscoreinput.val(score.away);
			}

			var title = $('<h5>').text(away.team + ' @ ' + home.team);
			return r.append($('<div>', {'class': 'col-md-3'}).append(title))
					.append($('<div>', {'class': 'col-md-3'}).append(awayscoreinput))
					.append($('<div>', {'class': 'col-md-3'}).append(homescoreinput));
		}
	});

	var SpreadView = Backbone.View.extend({
		className: 'col-md-12 spread-form',
		events: {
			'click button.submit-spread': 'handleSubmitSpread'
		},
		handleSubmitSpread: function( e ) {
			var inputs = $(e.target).closest('div.spread-form').find('input');
			var spreads = [];
			_.each(inputs, function(input) {
				var $input = $(input);
				var gameid = $input.attr('id').match(/[0-9]+/);
				var spread = $input.val();
				spreads.push({
					gameid: parseInt(gameid),
					spread: spread === '' ? undefined : spread
				});
			});

			this.trigger('save-spread', spreads);
		},
		render: function() {
			var title = $('<h4>').text('Input Spread');
			this.$el.append($('<div>',{'class': 'row'}).append(title).append($('<br>')));

			this.collection.each( function( game ) {
				this.$el.append(this.row(game));
			}, this );

			var saveButton = $('<button>', {'class': 'btn btn-default submit-spread', text:'Save Spreads'});
			this.$el.append($('<div>',{'class': 'row'}).append(saveButton));
			return this;
		},
		row: function( game ) {
			var spread = game.get('spread');
			var away = game.get('away');
			var home = game.get('home');
			var id = game.get('id');

			var r = $('<div>', {'class': 'row'});
			var spreadinput = $('<input>', {'class': 'form-control', id: 'game-'+id, placeholder: 'Spread', type:'number'});

			if ( spread ) {
				spreadinput.val(spread);
			}

			var title = $('<h5>').text(away.team + ' @ ' + home.team);
			return r.append($('<div>', {'class': 'col-md-3'}).append(title))
					.append($('<div>', {'class': 'col-md-3'}).append(spreadinput));
		}
	});

	var AdminListView = Backbone.View.extend({
		className: 'container list-games',
		pager: _.template($('#pager').html()),
		handleSubmitSpread: function(e) {
			console.log(e);
		},
		handleSubmitScore: function(e) {
			console.log(e);
		},
		render: function() {
			var week = this.options.week;
			var year = this.options.year;

			var pagerel = $('<div>',{'class': 'col-md-4 col-md-offset-3'})
				.append(this.pager({
						url: 'admin',
						week: week,
						year: year,
						previousweek: Utils.prevWeek(week),
						nextweek: Utils.nextWeek(week),
						label: 'Week ' + week
					}));
			var navel = $('<div>',{'class':'col-md-5'})
				.append($('<ul>',{'class':'pagination'})
					.append($('<li>').append($('<a>',{href:'/#week/' + week})
							.html('Week ' + week + ' Games'))));

			var controlel = $('<div>',{'class':'container'})
				.append($('<div>',{'class':'row'})
					.append(navel)
					.append(pagerel));
			this.$el.append(controlel);

			var me = this;
			var spreadView = new SpreadView({ collection: this.collection });
			spreadView.on('save-spread', function(data) {
				me.trigger('save-spread', {spreads:data});
			});
			this.$el.append($('<div>', {'class': 'row game-row white-bg'}).append(spreadView.render().el));
			
			// var scoreView = new ScoreView({ collection: this.collection });
			// scoreView.on('save-score', function(data) {
			// 	me.trigger('save-score', {scores: data});
			// });
			// this.$el.append($('<div>', {'class': 'row game-row white-bg'}).append(scoreView.render().el));

			return this;
		}
	});

	return AdminListView;
});