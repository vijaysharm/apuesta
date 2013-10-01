define([
'bootstrap',
'backbone',
'views/login',
'collections/home',
'views/home',
'utils'
], 
function(
	Bootstrap,
	Backbone,
	LoginView,
	HomeCollection,
	HomeView,
	Utils
	) {
	var Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'week/:id': 'showWeek',
			'game/:id': 'showGame',
			'picks/:week': 'showPicks'
		},
		home: function() {
			this.showWeek( Utils.computeWeek() );
		},
		login: function() {
			$('#main')
				.hide();

			$('#login')
				.html(new LoginView().render().el)
				.show();
		},
		showWeek: function( id ) {
			$('#login').hide();
			$('#content').hide();
			$('#loading').show();
			$('#main').show();

			this.fetchWeek( id, function( data ) {
				// var homeModel = new HomeModel({ week:week });
				var homeView = new HomeView({ collection: new HomeCollection( data ) });

				$('#content').html(homeView.render().el);
				$('#loading').hide();
				$('#content').show();
			});
		},
		showGame: function( id ) {
			$('#login').hide();
			$('#content').hide();
			$('#loading').show();
			$('#main').show();

			this.fetchWeek( id, function( data ) {
				// var homeModel = new HomeModel({ week:week });
				// var homeView = new HomeView({ collection: new HomeCollection( data ) });

				$('#content').html('Show game: ' + id);
				$('#loading').hide();
				$('#content').show();
			});
		},
		showPicks: function( week ) {
			$('#login').hide();
			$('#content').hide();
			$('#loading').show();
			$('#main').show();

			this.fetchWeek( id, function( data ) {
				// var homeModel = new HomeModel({ week:week });
				// var homeView = new HomeView({ collection: new HomeCollection( data ) });

				$('#content').html('Show picks ' + week);
				$('#loading').hide();
				$('#content').show();
			});
		},
		fetchWeek: function( week, callback ) {
			var url = '/api/week/' + week;
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: callback
			});
		}
	});

	$.ajaxSetup({
		status: {
			// Redirect to the login
			401: function() {
				console.log('401!!!');
				// window.location.replace('#login');
				Backbone.history.navigate('/#login');
				// maybe call Main.getCurrentView().showError("")?
			},
			// Access Denied
			403: function() {
				// maybe call Main.getCurrentView().showError("")?
			}
		}
	});

	return Main;
});