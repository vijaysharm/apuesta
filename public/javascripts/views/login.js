define(['underscore','backbone'], function(_,Backbone) {
	var LoginView = Backbone.View.extend({
		el: '#login',
		events: {
			'click #loginButton': 'login'
		},
		initialize: function() {
		},
		render: function() {
			return this;
		},
		login: function( event ) {
			event.preventDefault();
			var data = {
				username: $('#username').val()
			};

			$.ajax({
				url: '/login',
				type: 'POST',
				dataType: 'json',
				data: data,
				success: this.loginCallback
			});
		},
		loginCallback: function( data ) {
			if ( data.error ) {
				console.log(data);
			} else {
				Backbone.history.navigate('/#');
			}
		}
	});

	return LoginView;
});