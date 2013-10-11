define([
	'backbone',
	'views/login',
	'collections/home',
	'views/home',
	'models/game',
	'views/game',
	'models/picks',
	'views/picks',
	'views/admin',
	'utils'
], 
function( Backbone,
		  LoginView,
		  HomeCollection,
		  HomeView,
		  GameModel,
		  GameView,
		  PicksModel,
		  PicksView,
		  AdminListView,
		  Utils ) 
{
	var Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'week/:weekid': 'showWeek',
			'game/:gameid': 'showGame',
			'picks/:weekid': 'showPicks',
			'admin/:weekid': 'showAdmin',
			'admin': 'showAdmin',
		},
		home: function() {
			this.showWeek( Utils.computeWeek() );
		},
		login: function() {
			$('#content').hide();
			$('#loading').show();
			$('#logout').hide();
			var me = this;
			var loginView = new LoginView();
			loginView.on('login', function(data) {
				me.doPost('/login',data, function(result) {

					Backbone.history.navigate('/#');
				});
			});

			$('#content').html(loginView.render().el);
			$('#loading').hide();
			$('#content').show();
		},
		showWeek: function( weekid ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').show();
			var me = this;
			this.fetchWeek( weekid, function( data ) {
				var homeView = new HomeView({ 
					week: weekid, 
					collection: new HomeCollection( data )
				});
				homeView.on('save', function(data) { 
					this.updateSelectedTeam(data,function(result){
						console.log('pick saved!');
					});
				}, me);
				$('#content').html(homeView.render().el);
				$('#loading').hide();
				$('#content').show();
			});
		},
		showGame: function( gameid ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').show();

			var me = this;
			this.fetchGame( gameid, function( data ) {
				var gameView = new GameView({ 
					gameid: gameid,
					model: new GameModel({ game:data })
				});
				gameView.on('comment',function(comment){
					console.log(comment.gameid + ": " + comment.comment);
					me.addComment(comment, function(result){
						gameView.addComment(result);
					});
				},me);
				gameView.on('save', function(data) { 
					this.updateSelectedTeam(data,function(result){
						console.log('pick saved!');
					});
				}, me);
				$('#content').html(gameView.render().el);
				$('#loading').hide();
				$('#content').show();

				me.fetchComments( gameid, function( comments ) {
					gameView.showComments( comments );
				});
			});
		},
		showPicks: function( weekid ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').show();

			this.fetchPicks( weekid, function( data ) {
				var picksView = new PicksView({ week: weekid, model: new PicksModel({ picks:data }) });

				$('#content').html(picksView.render().el);
				$('#content').append(data);

				$('#loading').hide();
				$('#content').show();
			});
		},
		showAdmin: function( weekid ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').show();
			
			weekid = weekid || Utils.computeWeek();
			var me = this;
			this.fetchAdminWeek( weekid, function( data ) {
				var adminView = new AdminListView({ 
					week: weekid, 
					collection: new HomeCollection( data )
				});
				adminView.on('save-spread', function(data) { 
					this.updateSpreads(data,function(result){
						console.log('spread saved!');
					});
				}, me);
				adminView.on('save-score', function(data) { 
					this.updateScores(data,function(result){
						console.log('scores saved!');
					});
				}, me);

				$('#content').html(adminView.render().el);
				$('#loading').hide();
				$('#content').show();
			});			
		},
		fetchAdminWeek: function( week, callback ) {
			var url = '/api/admin/weeks/' + week;
			this.doGet( url, callback );
		},
		fetchWeek: function( week, callback ) {
			var url = '/api/weeks/' + week;
			this.doGet( url, callback );
		},
		fetchGame: function( game, callback ) {
			var url = '/api/games/' + game;
			this.doGet( url, callback );
		},
		fetchPicks: function( week, callback ) {
			var url = '/api/picks/' + week;
			this.doGet( url, callback );
		},
		fetchComments: function( game, callback ) {
			var url = '/api/comments/' + game;
			this.doGet( url, callback );
		},
		updateSelectedTeam: function( data, callback ) {
			this.doPost( '/api/picks/', data, callback );
		},
		updateScores: function( data, callback ) {
			this.doPost( '/api/admin/scores/', data, callback );
		},
		updateSpreads: function( data, callback ) {
			this.doPost( '/api/admin/spreads/', data, callback );
		},
		addComment: function( data, callback ) {
			this.doPost( '/api/comments/', data, callback );
		},
		doPost: function( url, data, callback ) {
			this.doAjax({
				url: url,
				type: 'POST',
				dataType: 'json',
				success: callback,
				data: data,
				cache: false
			});
		},
		doGet: function( url, callback ) {
			this.doAjax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: callback
			});
		},
		doAjax: function(options) {
			options.statusCode = {
				// Redirect to the login
				401: function() {
					Backbone.history.navigate('/#login');
					// maybe call Main.getCurrentView().showError("")?
				},
				// Access Denied
				403: function() {
					// maybe call Main.getCurrentView().showError("")?
				},
				// Internal server error
				500: function() {
					// display a functional error
				}
			};
			$.ajax(options);
		}
	});

	return Main;
});