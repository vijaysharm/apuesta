define([
	'underscore',
	'backbone',
], function(_, Backbone) {
	var UserView = Backbone.View.extend({
		render: function() {
			return this;
		}
	});

	return UserView;
});