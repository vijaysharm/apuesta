var connection = require('./database');
var _ = require('underscore');

var users = require('./data/users').users;
var teams = require('./data/teams').team;
var schedule = require( './data/schedule');
var picks = require('./data/picks');
var metadata = require('./data/gamesmetadata').metadata;

var initializeUsers = function( db, callback ) {
	console.log( 'migration started.' );
	var usersdb = db.collection('users');
	usersdb.drop();
	usersdb.insert( users, function(err,result) {
		if(err) throw err;
		initializeSchedule( db, callback );
	} );
};

var initializeSchedule = function( db, callback ) {
	var metadatadb = db.collection('metadata');
	metadatadb.drop();

	var picksdb = db.collection('picks');
	picksdb.drop();

	for ( var i = 1; i < 18; i++ ) {
		var games = schedule.getGamesByWeek(i.toString());
		if ( games === undefined )
			continue;

		for ( var g in games ) {
			var game = games[g];
			var gameId = game.id;

			// Store the Metadata
			var md = metadata[gameId];
			if ( md )
			{
				var storedmetadata = _.extend({gameid: gameId, week:i}, md);
				metadatadb.insert(storedmetadata, function(err, storedresult) {
					if (err) throw err;
				});
			}

			// Store the picks
			var storedpicks = [];
			var is = i.toString();
			var p = picks.getInMemoryPick('1',i.toString(),gameId);
			if ( p ) {
				storedpicks.push({
					userid: 'krishna.tiwari@statcan.gc.ca',
					gameid: gameId,
					pick: p,
					week: i
				});
			}

			p = picks.getInMemoryPick('2',i.toString(),gameId);
			if ( p ) {
				storedpicks.push({
					userid: 'pierre-louis.venne@statcan.gc.ca',
					gameid: gameId,
					pick: p,
					week: i
				});
			}

			p = picks.getInMemoryPick('3',i.toString(),gameId);
			if ( p ) {
				storedpicks.push({
					userid: 'ralston.mcKenzie@statcan.gc.ca',
					gameid: gameId,
					pick: p,
					week: i
				});
			}

			p = picks.getInMemoryPick('4',i.toString(),gameId);
			if ( p ) {
				storedpicks.push({
					userid: 'sunil.bajaj@aandc-aadnc.gc.ca',
					gameid: gameId,
					pick: p,
					week: i
				});
			}

			p = picks.getInMemoryPick('5',i.toString(),gameId);
			if ( p ) {
				storedpicks.push({
					userid: 'vijay.sharm@gmail.com',
					gameid: gameId,
					pick: p,
					week: i
				});
			}

			if ( storedpicks.length > 0 ) {
				picksdb.insert(storedpicks, function(err,storedresult) {
					if(err) throw err;
				});
			}
		}
	}

	var versiondb = db.collection('properties');
	versiondb.insert({'version':1.0},function(err,version) {
		console.log('migration finished');
		callback();
	});
};

var fixRalston = function( db, callback ) {
	var usersdb = db.collection('users');
	var versiondb = db.collection('properties');
	var picksdb = db.collection('picks');
	var commentsdb = db.collection('comments');

	var ralston = {
		_id: 'ralston.mckenzie@statcan.gc.ca',
		name: 'Ralston',
		role: 'user',
		league: 'statscan'
	};
	var oldmail = 'ralston.mcKenzie@statcan.gc.ca';
	var newmail = 'ralston.mckenzie@statcan.gc.ca';
	var updateoptions = {multi:true};
	usersdb.insert(ralston,function(err,result){
		if( err ) throw err;
		usersdb.remove({_id:oldmail}, function(err, result) {
			if( err ) throw err;
			console.log('updated user. Now updating picks');
			picksdb.update({userid:oldmail},{$set:{userid:newmail}},updateoptions,function(err,result) {
				if( err ) throw err;
				console.log('picks updated. Updating comments');
				commentsdb.update({userid:oldmail},{$set:{userid:newmail}},updateoptions,function(err,result) {
					if( err ) throw err;
					console.log('comments updated. Updating version');
					versiondb.update({},{$set:{version:2.0}},function(err,version) {
						if( err ) throw err;
						console.log('user updating finished');
						callback();
					});
				});
			});
		});
	});
};

exports.execute = function( callback ) {
	var end = function() {
		callback();
	};

	connection.getInstance(function( db ) {
		var versiondb = db.collection('properties');
		versiondb.findOne(function(err,version) {
			if ( err ) throw err;

			if ( version == null ) {
				initializeUsers( db, end );
			} else if ( version.version === 1.0 ) {
				fixRalston( db, end );
			} else {
				end();
			}
		});
	});
};