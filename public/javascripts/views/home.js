define([
	'underscore',
	'backbone',
	'moment',
	'utils'
], function(_, Backbone, moment, Utils) {
	var GameView = Backbone.View.extend({
		tagName: 'div',
		className: 'row game-row highlight',
		teamTemplate: _.template($('#team').html()),
		scoreTemplate: _.template($('#score').html()),
		spanTemplate: _.template($('#span-template').html()),
		selectorTemplate: _.template($('#team-selector').html()),
		events: {
			'click input': 'handleTeamSelect',
			'click': 'handleGameSelection'
		},
		handleTeamSelect: function(e) {
			var input = $(e.target);
			var team = input.attr('id');
			var gameid = this.model.get('id');
			
			var away = this.model.get('away').team.toLowerCase();
			var home = this.model.get('home').team.toLowerCase();
			var labels = input.closest('div.btn-group').find('label');

			labels.removeClass(home).removeClass(away).removeClass('pass');
			input.closest('label').addClass(team.toLowerCase());

			team = team === 'PASS' ? undefined : team;
			this.trigger('save', {
				pick: team,
				gameid: gameid,
				year: this.options.year,
				week: this.options.week
			});
		},
		handleGameSelection: function(e) {
			// TODO HACK: I shouldn't have these two checks here
			// I should have a way of saying that any selection 
			// inside the box is valid, and attach a listener for
			// that instead.
			var $target = $(e.target);
			if ( $target.hasClass('team-selection') )
				return;

			if ( $(e.target).attr('name') === 'options' )
				return;

			var gameid = this.model.get('id');
			this.trigger('select', {
				gameid: gameid,
				year: this.options.year,
				week: this.options.week
			})
		},
		addTeamPick: function() {
			var pick = this.model.get('pick');
			var winneragainstspread = this.model.get('winneragainstspread');
			var date = moment.utc(this.model.get('date'), moment.ISO_8601)
			var now = moment();

			var away = this.model.get('away');
			var home = this.model.get('home');

			var pickline
			if ( now.isAfter(date) ) {
				if ( pick ) {
					pickline = $('<h4>').append("You picked ")
						.append(this.spanTemplate({
							cls: pick.toLowerCase(),
							text: pick
					}));

					if ( winneragainstspread ) {
						this.$el.addClass(winneragainstspread === pick ? 'win' : 'lose');
					}						
				} else {
					pickline = $('<h4>').append("You passed on this game");
				}
			} else {
				var selectordata = {
					pass : {
						data:'PASS',
						label:'Pass',
						style:'team-selection highlight-invert'
					},
					home: {
						data: home.team,
						label: home.team,
						style: 'team-selection highlight-invert'
					},
					away: {
						data: away.team,
						label: away.team,
						style: 'team-selection highlight-invert'
					}
				}	

				var property;
				var val;
				if ( pick ) {
					if ( pick === home.team ) {
						property = 'home';
						val = home.team.toLowerCase();
					} else {
						property = 'away';
						val = away.team.toLowerCase();
					}
				} else {
					property = 'pass';
					val = 'pass';
				}
				selectordata[property].style = 
					selectordata[property].style + ' ' + val;

				pickline = $('<span>',{'class':'pick'})
					.append($('<h4>').text('Pick: '))
					.append(this.selectorTemplate(selectordata));	
			}
			
			var col = $('<div>',{'class':'col-md-12'}).append(pickline);
			return $('<div>',{'class':'row spread-pick-row'}).append(col);
		},
		addTeamSpread: function(team, spread) {
			var winneragainstspread = this.model.get('winneragainstspread');

			var spreadline = $('<h4>').append(this.spanTemplate({
				cls: team.toLowerCase(),
				text: team
			})).append(" favoured by " + Math.abs(spread));

			if ( winneragainstspread ) {
				var text = (winneragainstspread === team) ? ' covered' : ' didn\'t cover';
				spreadline.append(text+ ' the spread');
			}

			var col = $('<div>',{'class':'col-md-12'}).append(spreadline);
			return $('<div>',{'class':'row'}).append(col);
		},
		render: function() {
			var spread = this.model.get('spread');
			var away = this.model.get('away');
			var home = this.model.get('home');
			var score = this.model.get('score');
		
			var awayel = $('<div>',{'class':'col-md-4 col-xs-4'})
				.append(this.teamTemplate({
					team: away
				}));
			var homeel = $('<div>',{'class':'col-md-4 col-xs-4'})
				.append(this.teamTemplate({
					team: home
				}));

			var middleel = null;
			if ( score ) {
				middleel = $('<div>',{'class':'col-md-4 col-xs-4 scores text-center'})
					.html(this.scoreTemplate({score:score}));
			} else {
				middleel = $('<div>',{"class": 'col-md-4 col-xs-4 text-center'})
					.html('<h2>@<h2>');
			}

			var spacing = spread ? 'col-md-5 col-md-offset-1' : 'col-md-4 col-md-offset-4'
			var row = $('<div>',{"class": spacing})
				.append($('<div>',{"class": 'row'})
							.append(awayel)
							.append(middleel)
							.append(homeel));
			this.$el.append(row);

			if ( spread ) {
				var col = $('<div>',{"class":'col-md-5 col-md-offset-1 spread-row'});
				var home = home.team;
				var away = away.team;
				if ( spread < 0 ) {
					var a = this.addTeamSpread(away, spread);
					col.append(a);
				} else if ( spread > 0 ) {
					var a = this.addTeamSpread(home, spread);
					col.append(a);
				} else {
					col.append($('<h4>').text('Even'));
				}
				col.append(this.addTeamPick());
				this.$el.append(col);
			}

			return this;
		}
	});

	var GameListView = Backbone.View.extend({
		tagName: 'div',
		className: 'list-games',
		pager: _.template($('#pager').html()),
		render: function() {
			var week = this.options.week;
			var year = this.options.year;
			var navel = $('<div>',{'class':'col-md-5'})
				.append($('<ul>',{'class':'pagination'})
					.append($('<li>',{'class':'active'})
						.append($('<a>',{href:'/#week/' + year + '/' + week}).text('Week ' + week + ' Games')))
					.append($('<li>')
						.append($('<a>',{href:'/#picks/' + year + '/' + week}).text("League Picks"))));

			var pagerel = $('<div>',{'class': 'col-md-5 col-md-offset-2'})
				.append(this.pager({
						url: 'week',
						year: year,
						previousweek: Utils.prevWeek(week),
						nextweek: Utils.nextWeek(week),
						label: 'Next: Week ' + Utils.nextWeek(week)
					}));
			var controlel = $('<div>',{'class':'container'})
				.append($('<div>',{'class':'row'})
					.append(navel)
					.append(pagerel));
			this.$el.append(controlel);

			this.collection.each( function( game ) {
				var gameView = new GameView({ 
					model: game,
					week : week,
					year : year
				});

				gameView.on('save',function(data) {
					data.week = week;
					data.year = year;
					this.trigger('save', data);
				}, this);
				gameView.on('select', function(data) {
					this.trigger('select', data);
				}, this);
				this.$el.append(gameView.render().el);
			}, this);
			
			return this;
		}
	});

	return GameListView;
});
