define([
	'underscore',
	'module',
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
function( _,
		  env,
		  Backbone,
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
		config: env.config(),
		routes: {
			'': 'home',
			'login': 'login',
			'week/:year/:week': 'showWeek',
			'game/:year/:week/:gameid': 'showGame',
			'picks/:year/:week': 'showPicks',
			'admin/:year/:week': 'showAdmin',
			'admin': 'showAdmin',
		},
		logoutbar: _.template($('#logoutbar').html()),
		home: function() {
			Backbone.history.navigate('/#week/' + this.config.year + '/' + Utils.computeWeek());
		},
		login: function() {
			$('#content').hide();
			$('#loading').show();
			$('#logout').html('');
			var me = this;
			var loginView = new LoginView();
			var headerCallback = this.headerCallback();
			loginView.on('login', function(data) {
				me.doPost('/login', data, headerCallback, function(result) {
					localStorage.sessionid = result.sessionid;
					localStorage.email = result.email;
					Backbone.history.navigate('/#');
				});
			});

			$('#content').html(loginView.render().el);
			$('#loading').hide();
			$('#content').show();
		},
		showWeek: function( year, week ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').html(this.logoutbar({
				sessionId: localStorage.sessionid
			}));

			var me = this;
			this.fetchWeek( year, week, function( data ) {
				var homeView = new HomeView({ 
					week: week,
					year: year,
					collection: new HomeCollection( data )
				});
				homeView.on('save', function(data) { 
					this.updateSelectedTeam(data,function(result){
						console.log('pick saved!');
					});
				}, me);
				homeView.on('select', function(data) {
					Backbone.history.navigate('/#game/' + data.year + '/' + data.week + '/' + data.gameid);
				}, me);
				$('#content').html(homeView.render().el);
				$('#loading').hide();
				$('#content').show();
			});
		},
		showGame: function( year, week, gameid ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').html(this.logoutbar({
				sessionId: localStorage.sessionid
			}));

			var me = this;
			this.fetchGame( year, week, gameid, function( data ) {
				var gameView = new GameView({
					week: week,
					year: year,
					gameid: gameid,
					model: new GameModel({ game:data })
				});
				gameView.on('comment',function(comment){
					me.addComment(comment, function(result){
						gameView.addComment(result);
					});
				}, me);
				gameView.on('save', function(data) { 
					this.updateSelectedTeam(data,function(result){
						console.log('pick saved!');
					});
				}, me);
				$('#content').html(gameView.render().el);
				$('#loading').hide();
				$('#content').show();

				// me.fetchComments( gameid, function( comments ) {
				// 	gameView.showComments( comments );
				// });
			});
		},
		showPicks: function( year, week ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').html(this.logoutbar({
				sessionId: localStorage.sessionid
			}));

			this.fetchPicks( year, week, function( data ) {
				var picksView = new PicksView({ week: week, model: new PicksModel({ picks:data }) });

				$('#content').html(picksView.render().el);
				$('#content').append(data);

				$('#loading').hide();
				$('#content').show();
			});
		},
		showAdmin: function( year, week ) {
			$('#content').hide();
			$('#loading').show();
			$('#logout').html(this.logoutbar({
				sessionId: localStorage.sessionid
			}));
			
			week = week || Utils.computeWeek();
			year = year || this.config.year;

			var me = this;
			this.fetchWeek( year, week, function( data ) {
				var adminView = new AdminListView({ 
					week: week, 
					year: year,
					collection: new HomeCollection( data )
				});
				adminView.on('save-spread', function(data) { 
					this.updateSpreads(data,function(result){
						// Backbone.history.navigate('/#');
					});
				}, me);
				adminView.on('save-score', function(data) { 
					this.updateScores(data,function(result){
						// Backbone.history.navigate('/#');
					});
				}, me);

				$('#content').html(adminView.render().el);
				$('#loading').hide();
				$('#content').show();
			});			
		},
		fetchWeek: function( year, week, callback ) {
			var url = '/api/games/' + year + '/' + week;
			var headerCallback = this.headerCallback();
			this.doGet( url, headerCallback, callback );
		},
		fetchGame: function( year, week, game, callback ) {
			var url = '/api/games/' + year + '/' + week + '/' + game;
			var headerCallback = this.headerCallback();
			this.doGet( url, headerCallback, callback );
		},
		fetchPicks: function( year, week, callback ) {
			var url = '/api/picks/' + year + '/' + week;
			var headerCallback = this.headerCallback();
			this.doGet( url, headerCallback, callback );
		},
		fetchComments: function( game, callback ) {
			var url = '/api/comments/' + game;
			var headerCallback = this.headerCallback();
			this.doGet( url, headerCallback, callback );
		},
		updateSelectedTeam: function( data, callback ) {
			var headerCallback = this.headerCallback();
			this.doPost( '/api/picks/' + data.year + '/' + data.week + '/' + data.gameid, data, headerCallback, callback );
		},
		updateScores: function( data, callback ) {
			var headerCallback = this.headerCallback();
			this.doPost( '/api/admin/scores/', headerCallback, data, headerCallback, callback );
		},
		updateSpreads: function( data, callback ) {
			var headerCallback = this.headerCallback();
			this.doPost( '/api/admin/spreads/' + data.year + '/' + data.week, data, headerCallback, callback );
		},
		addComment: function( data, callback ) {
			var headerCallback = this.headerCallback();
			this.doPost( '/api/comments/', headerCallback, data, callback );
		},
		doPost: function( url, data, headerCallback, callback ) {
			this.doAjax({
				url: url,
				beforeSend: headerCallback,
				type: 'POST',
				dataType: 'json',
				success: callback,
				data: data,
				cache: false
			});
		},
		doGet: function( url, headerCallback, callback ) {
			this.doAjax({
				url: url,
				beforeSend: headerCallback,
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
					Backbone.history.navigate('/#login');
				},
				// Internal server error
				500: function() {
					// display a functional error
				}
			};
			$.ajax(options);
		},
		headerCallback: function() {
			var sessionId = localStorage.sessionid;
			var email = localStorage.email;
			var apiKey = this.config.apiKey;
			var type = this.config.type;

			return function(xhr) {
				if ( apiKey )
					xhr.setRequestHeader('apikey', apiKey);

				if ( sessionId )
					xhr.setRequestHeader('sessionid', sessionId);

				if ( email )
					xhr.setRequestHeader('email', email);

				if ( type )
					xhr.setRequestHeader('type', type);
			};
		}
	});

	return Main;
});