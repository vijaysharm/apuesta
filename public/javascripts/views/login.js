define(['underscore','backbone'], function(_,Backbone) {
	
	var LoginView = Backbone.View.extend({
		className:'container padding-48 white-bg',
		template: _.template($('#login-block').html()),
		events: {
			'click #loginButton': 'login'
		},
		render: function() {
			this.$el.append(this.template({}));
			return this;
		},
		login: function( event ) {
			event.preventDefault();
			var data = {
				username: $('#username').val()
			};

			this.trigger('login', data);
		}
	});

	return LoginView;
});