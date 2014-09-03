define(['underscore','backbone','utils'], function(_,Backbone,Utils) {
	var PicksView = Backbone.View.extend({
		pager: _.template($('#pager').html()),
		render: function() {
			var week = this.options.week;
			var year = this.options.year;
			var navel = $('<div>',{'class':'col-md-5'})
				.append($('<ul>',{'class':'pagination'})
					.append($('<li>')
						.append($('<a>',{href:'/#week/' + year + '/' + week}).text('Week ' + week + ' Games')))
					.append($('<li>',{'class':'active'})
						.append($('<a>',{href:'/#picks/' + year + '/' + week}).text("League Picks"))));

			var pagerel = $('<div>',{'class': 'col-md-5 col-md-offset-2'})
				.append(this.pager({
						url: 'picks',
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

			var games = this.model.get('picks').games;
			var rows = [];
			var outcome = {};
			for ( var i in games ) {
				var game = games[i];
				var row = $('<tr>');
				var home = game.home.team;
				var away = game.away.team;
				var homeel = $('<div>',{
					"class":home.toLowerCase() + " " + "text-center picks-team"
				}).text(home);
				var awayel = $('<div>',{
					"class":away.toLowerCase() + " " + "text-center picks-team"
				}).text(away);

				var divel = $('<a>',{
					'class': 'picks-vs',
					'href': '/#game/' + game.id
				}).append(awayel).append(homeel);

				var a = $('<td>',{'class':'highlight'}).append(divel).css({
							'vertical-align':'middle',
							'padding': '0 8px'
						});
				a.click(function(e){
					console.log('got click ' + game.id);
				});

				row.append( a );
				for ( var j in game.picks ) {
					var userpick = game.picks[j];
					var p = null;
					var pickcell = $('<td>', {'class':'middle-align'});
					outcome[userpick.user] = outcome[userpick.user] || {};
					outcome[userpick.user].win = outcome[userpick.user].win || 0;
					outcome[userpick.user].lose = outcome[userpick.user].lose || 0;
					if ( userpick.pick ) {
						// TODO: yuck. i should either use the path to the image itself from the data
						// or have the client side always work images (and remove it from the DB)
						p = $('<img>',{src: '/images/' + userpick.pick + '.png'});
						if ( userpick.winneragainstspread ) {
							var win = userpick.winneragainstspread === userpick.pick;
							pickcell.addClass( win ? 'win' : 'lose' );
							if ( win ) {
								outcome[userpick.user].win++;
							} else {
								outcome[userpick.user].lose++;
							}
						}
					} else {
						p = $('<h3>',{'class': 'text-center', text: 'pass'});
						pickcell.addClass( 'pass-invert' );
						pickcell.css( 'vertical-align', 'middle' );
					}
					row.append(pickcell.append(p));
				}
				// table.append(row);
				rows.push(row);
			}

			var users = this.model.get('picks').users;
			var table = $('<table>',{"class": 'table'});
			var header = $('<tr>');
			header.append($('<th>').text(''));
			for ( var i in users ) {
				var user = users[i];
				var name = $('<div>').text(user.name);
				var record = $('<div>').text(outcome[user.id].win + '-' + outcome[user.id].lose);
				header.append($('<th>').append(name).append(record));
			}

			table.append(header,rows);

			this.$el.append($('<div>',{'class': 'container white-bg'}).append(table));
			return this;
		}
	});

	return PicksView;
});