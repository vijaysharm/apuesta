define([
	'underscore',
	'backbone',
	'moment'
],function(_,Backbone,moment) {
	var GameView = Backbone.View.extend({
		teamTemplate: _.template($('#team').html()),
		scoreTemplate: _.template($('#score').html()),
		commentTemplate: _.template($('#game-comment-block').html()),
		pager: _.template($('#pager').html()),
		addTeamPick: function() {
			// var pick = this.model.get('pick');
			// var winneragainstspread = this.model.get('winneragainstspread');
			var date = new Date(this.model.get('date'));
			var now = new Date();

			var away = this.model.get('away');
			var home = this.model.get('home');

			// var pickline
			// if ( now > date ) {
			// 	if ( pick ) {
			// 		pickline = $('<h4>').append("You picked ")
			// 			.append(this.spanTemplate({
			// 				cls: pick.toLowerCase(),
			// 				text: pick
			// 		}));

			// 		if ( winneragainstspread ) {
			// 			this.$el.addClass(winneragainstspread === pick ? 'win' : 'lose');
			// 		}						
			// 	} else {
			// 		pickline = $('<h4>').append("You passed on this game");
			// 	}
			// } else {
			// 	var selectordata = {
			// 		pass : {
			// 			data:'PASS',
			// 			label:'Pass',
			// 			style:'team-selection highlight-invert'
			// 		},
			// 		home: {
			// 			data: home.team,
			// 			label: home.team,
			// 			style: 'team-selection highlight-invert'
			// 		},
			// 		away: {
			// 			data: away.team,
			// 			label: away.team,
			// 			style: 'team-selection highlight-invert'
			// 		}
			// 	}	

			// 	var property;
			// 	var val;
			// 	if ( pick ) {
			// 		if ( pick === home.team ) {
			// 			property = 'home';
			// 			val = home.team.toLowerCase();
			// 		} else {
			// 			property = 'away';
			// 			val = away.team.toLowerCase();
			// 		}
			// 	} else {
			// 		property = 'pass';
			// 		val = 'pass';
			// 	}
			// 	selectordata[property].style = 
			// 		selectordata[property].style + ' ' + val;

			// 	pickline = $('<span>',{'class':'pick'})
			// 		.append($('<h4>').text('Pick: '))
			// 		.append(this.selectorTemplate(selectordata));	
			// }
			
			return pickline;
		},
		events: {
			'click #back': 'back'
		},
		back: function(e) {
			e.preventDefault();
			window.history.back();
		},
		render: function() {
			var data = this.model.get('game');
			var back = $('<a>',{
				href:'#',
				'id': 'back'
			}).html('&laquo; Back to Week ' + data.week + ' Games');

			var navel = $('<div>',{'class':'col-md-5'})
				.append($('<ul>',{'class':'pagination'})
					.append($('<li>').append(back)));

			var pagerel = $('<div>',{'class': 'col-md-4 col-md-offset-3'})
				.append(this.pager({
						url: 'game',
						previousweek: data.previousgame,
						week: data.id,
						nextweek: data.nextgame,
						label: data.away.team + '@' + data.home.team
					}));

			var controlel = $('<div>',{'class':'container'})
				.append($('<div>',{'class':'row'})
					.append(navel)
					.append(pagerel));
			this.$el.append(controlel);

			var container = $('<div>',{'class':'container white-bg'});
			var away = $('<div>',{"class":'col-md-2 col-md-offset-3'}).html(this.teamTemplate({ team : data.away }));
			var home = $('<div>',{"class":'col-md-2'}).html(this.teamTemplate({ team : data.home }));

			var middleel = null;
			if ( data.score ) {
				middleel = $('<div>',{'class':'col-md-2 scores text-center'})
					.html(this.scoreTemplate({score:data.score}));
			} else {
				middleel = $('<div>',{"class":'col-md-2 text-center'}).html('<h3>@</h3>');
			}

			var teams = $('<div>',{"class":'row teams'})
				.append(away).append(middleel).append(home);
			container.append(teams);

			if ( data.spread ) {
				var col = $('<div>',{"class":'col-md-12 text-center'});
				var spreadel = $('<div>',{"class":'row spread'}).append(col);

				var spread = data.spread;
				if ( spread < 0 ) {
					var away = data.away.team;
					var span = $('<span>',{"class":away.toLowerCase()}).text(away); 
					span.addClass('teamid');
					col.append($('<h3>').append(span).append(" favoured by " + Math.abs(spread)));
				} else if ( spread > 0 ) {
					var home = data.home.team;
					var span = $('<span>',{"class":home.toLowerCase()}).text(home); 
					span.addClass('teamid');
					col.append($('<h3>').append(span).append(" favoured by " + Math.abs(spread)));
				} else {
					col.text('Even');
				}
				// col.append(this.addTeamPick());
				container.append(spreadel);
			}

			if ( data.picks ) {
				var table = $('<table>',{"class": 'table'});
				var userrow = $('<tr>');
				var pickrow = $('<tr>');
				for ( var i in data.picks ) {
					var userpick = data.picks[i];
					userrow.append($('<th>').text(userpick.user.name));
					
					var p = null;
					var pickcell = $('<td>');
					if ( userpick.pick ) {
						// TODO: yuck. i should either use the path to the image itself from the data
						// or have the client side always work images (and remove it from the DB)
						p = $('<img>',{src: '/images/' + userpick.pick + '.png'});
						if ( data.winneragainstspread ) {
							var win = data.winneragainstspread === userpick.pick;
							pickcell.addClass( win ? 'win' : 'lose' );
						}
					} else {
						p = $('<h4>',{'class': 'text-center', text: 'pass'});
						pickcell.addClass( 'pass-invert' );
						pickcell.css( 'vertical-align', 'middle' );
					}
					pickrow.append(pickcell.append(p));
				}
				table.append(userrow);
				table.append(pickrow);
				container.append($('<div>',{'class':'row'}).append(table));
			}

			var comments = $('<div>', {'id':'comments','class':'row'})
				.html($('<h4>').text('Loading comments...'));

			container.append(comments);

			this.$el.append(container);
			return this;
		},
		createCommentBlock: function( comment ) {
			var commentel = this.commentTemplate({
				by: comment.user,
				when: moment(comment.date).format('MMM Do'),
				comment: comment.comment
			});
			var commentcell = $('<div>',{'class':'col-md-8 col-md-offset-2'}).html(commentel);
			return $('<div>',{'class':'row'}).append(commentcell);
		},
		addComment: function( comment ) {
			$('#commentarea').append(this.createCommentBlock(comment));
		},
		showComments: function( comments ) {
			var gameid = this.options.gameid;
			var me = this;
			var submit = $('<button>', {
				type:'button',
				'class': 'btn btn-lg btn-block post-btn',
				text: 'Post'
			}).hide();
			var input = $('<textarea>', {
				'class': 'form-control input-hg',
				placeholder: 'Post a comment...'
			});
			input.on('keyup paste', function() {
				submit.hide();
   				var checklength = input.val().length;

   				if( checklength ) {
   					submit.show();
   				}
			});
			submit.click(function() {
				me.trigger('comment', {
					comment: input.val(),
					gameid: gameid
				});
				input.val('');
				submit.hide();				
			});
			var z = $('<div>',{'class':'col-md-8 col-md-offset-2'})
				.append(input);
			var x = $('<div>',{'class':'col-md-2'})
				.append(submit);
			var textarearow = $('<div>',{'class':'row'})
				.append(z).append(x);

			var commentcol = $('<div>',{'class':'col-md-12', 'id': 'commentarea'});
			var commentsrow = $('<div>',{'class':'row'}).append(commentcol).css('padding-top', '32px');
			_.each(comments,function(comment){
				commentcol.append(this.createCommentBlock(comment));
			},this);

			$('#comments').html($('<div>',{'class':'col-md-12'}).append(textarearow).append(commentsrow));
		}
	});

	return GameView;
});