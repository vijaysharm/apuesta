var connection = require('./database');
var _ = require('underscore');
var moment = require('moment');

function getDb( req, res, next ) {
	connection.getInstance(function(db) {
		req.db = db;
		res.on('finish', function() {
			req.db.close();
		});
		next();
	});
};

/*
def year_phase_week():
    cur_year, _ = nflgame.live.current_year_and_week()
    season_types = (
        ('PRE', xrange(1, 4 + 1)),
        ('REG', xrange(1, 17 + 1)),
        ('POST', xrange(1, 4 + 1)),
    )
    for year in range(2009, cur_year+1):
        for stype, weeks in season_types:
            for week in weeks:
                yield year, stype, week


def schedule_url(year, stype, week):
    """
    Returns the NFL.com XML schedule URL. `year` should be an
    integer, `stype` should be one of the strings `PRE`, `REG` or
    `POST`, and `gsis_week` should be a value in the range
    `[1, 17]`.
    """
    xmlurl = 'http://www.nfl.com/ajax/scorestrip?'
    if stype == 'POST':
        week += 17
        if week == 21:  # NFL.com you so silly
            week += 1
    return '%sseason=%d&seasonType=%s&week=%d' % (xmlurl, year, stype, week)
*/
function week(date) {
	for ( var i = 1; i < 18; i++ ) {
		if ( moment("20140903", "YYYYMMDD").add(i, "week").isAfter(date) )
			return i;
	}

	return 1;
}

function getDate() {
	var date = new Date();

	return {
		// REG season
		year: date.getFullYear(),
		type: 'REG',
		max: 17,
		min: 1,
		current: week(date)

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
	};
}

exports.install = function( app ) {
	app.get('/', getDb, function( req, res ) {
		var version = req.db.version();
		version.findOne(function(err, properties) {
			var items = _.extend({
				apikey: properties.apikey,
			}, getDate());

			res.render('index', items);
		});
	});
};