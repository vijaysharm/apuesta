var connection = require('./database');

function getDb( req, res, next ) {
	connection.getInstance(function(db) {
		req.db = db;
		res.on('finish', function() {
			req.db.close();
		});
		next();
	});
};

exports.install = function( app ) {
	app.get('/', getDb, function( req, res ) {
		var version = req.db.version();
		version.findOne(function(err, properties) {
			res.render('index', {
				apikey: properties.apikey,
				// REG season
				year: 2014,
				type: 'REG',
				max: 17,
				min: 1,
				current: 1

				// POST season
				// year: 2013,
				// type: 'POST',
				// min: 18,
				// max: 22,
				// current: 18

				// PRE season
				// year: 2013,
				// type: 'PRE',
				// min: 1,
				// max: 4,
				// current: 1
			});
		});
	});
};