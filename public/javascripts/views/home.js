define([
	'underscore',
	'backbone',
], function(_,Backbone) {

	var GameView = Backbone.View.extend({
		tagName:'div',
		className: 'game',
		teamsTemplate: _.template($('#teams').html()),
		scoreTemplate: _.template($('#score').html()),
		spreadTemplate: _.template($('#spread').html()),
		render: function() {
			var json = this.model.toJSON()
			this.$el.append(this.teamsTemplate(json));

			if ( this.model.get('score') ) {
				this.$el.append(this.scoreTemplate(json));
			}

			if ( this.model.get('spread') ) {
				var text = ''
				var spread = this.model.get('spread');
				if ( spread < 0 ) {
					text = this.model.get('away').data.name + " by " + Math.abs(spread);
				} else if ( spread > 0 ) {
					text = this.model.get('home').data.name + " by " + Math.abs(spread);
				} else {
					text = 'Even';
				}

				this.$el.append(this.spreadTemplate({text:text}));
			}

			var discuss = $('<a>', {
				href:'/#game/' + this.model.get('id'),
				text: 'Discuss >>'
			});

			this.$el.append( discuss );

			return this;
		}
	});

	var GameListView = Backbone.View.extend({
		tagName: 'div',
		className: 'list-games',
		render: function() {
			this.collection.each( function( game ) {
				this.$el.append(new GameView({ model: game }).render().el);
			}, this);

			return this;
		}
	});

	return GameListView;
});