var connection = require('./database');
var _ = require('underscore');

var teams = require('./data/teams').team;
var schedule = require( './data/schedule');
var picks = require('./data/picks');
var metadata = require('./data/gamesmetadata').metadata;

var users = [
	{
		_id: 'krishna.tiwari@statcan.gc.ca',
		name: 'Krishna',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'pierre-louis.venne@statcan.gc.ca',
		name: 'Pierre-Louis',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'ralston.mckenzie@statcan.gc.ca',
		name: 'Ralston',
		role: 'user',
		league: 'statscan'
	},
	{
		_id: 'sunil.bajaj@aandc-aadnc.gc.ca',
		name: 'Sunil',
		role: 'user',
		league: 'statscan'
	}, 
	{
		_id: 'vijay.sharm@gmail.com',
		name: 'Vijay',
		role: 'admin',
		league: 'statscan'
	}, 
];

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
					userid: 'ralston.mckenzie@statcan.gc.ca',
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
	usersdb.insert(ralston,function(err,result) {
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
						console.log('fixRalston finished');
						callback();
					});
				});
			});
		});
	});
};

var addArunMovePL = function( db, callback ) {
	var usersdb = db.collection('users');
	var versiondb = db.collection('properties');
	
	var arun = {
		_id: 'arun.b.nepali@gmail.com',
		name: 'Arun',
		role: 'user',
		league: 'statscan'
	};

	usersdb.insert(arun,function(err,result) {
		if( err ) throw err;
		usersdb.update({_id:'pierre-louis.venne@statcan.gc.ca'},{$unset:{league:''}}, function(err, result) {
			if( err ) throw err;
			versiondb.update({},{$set:{version:3.0}},function(err,version) {
				if( err ) throw err;
				console.log('addArunMovePL finished');
				callback();
			});
		});
	});
};

function removeRalstonFixWeek16Metadata( db, callback ) {
	var usersdb = db.collection('users');
	var versiondb = db.collection('properties');
	var metadatadb = db.collection('metadata');	

	usersdb.update({_id:'ralston.mckenzie@statcan.gc.ca'},{$unset:{league:''}}, function(err, result) {
		if( err ) throw err;
		metadatadb.update({gameid:240},{$set:{date:new Date('December 22, 2013, 20:40:00')}}, function(err, result) {
			if( err ) throw err;
			var update = {$set:{week:16, date:new Date('December 22, 2013, 20:40:00')}};
			metadatadb.findAndModify({ gameid:231 }, [['gameid','1']], update, { upsert:true, 'new':true }, function(err, result) {
				if( err ) throw err;
				versiondb.update({},{$set:{version:4.0}},function(err,version) {
					if( err ) throw err;
					console.log('removeRalstonFixWeek16Metadata finished');
					callback();
				});
			});
		});
	});
}

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
			} else if ( version.version === 2.0 ) {
				addArunMovePL( db, end );
			} else if ( version.version === 3.0 ) {
				removeRalstonFixWeek16Metadata( db, end );
			} else {
				end();
			}
		});
	});
};