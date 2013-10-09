define(function(){
	var Utils = {
		weeks : {
			1 : new Date(2013, 8, 4),
			2 : new Date(2013, 8, 11),
			3 : new Date(2013, 8, 18),
			4 : new Date(2013, 8, 25),
			5 : new Date(2013, 9, 2),
			6 : new Date(2013, 9, 9),
			7 : new Date(2013, 9, 16),
			8 : new Date(2013, 9, 23),
			9 : new Date(2013, 9, 30),
			10 : new Date(2013, 10, 6),
			11 : new Date(2013, 10, 13),
			12 : new Date(2013, 10, 20),
			13 : new Date(2013, 10, 27),
			14 : new Date(2013, 11, 4),
			15 : new Date(2013, 11, 11),
			16 : new Date(2013, 11, 18),
			17 : new Date(2013, 11, 25)
		},
		computeWeek: function() {
			var today = new Date();
			for ( week in this.weeks ) {
				if ( this.weeks[week] > today )
					return week;
			}

			return 1;
		},
		nextWeek: function(week) {
			week = parseInt(week);
			var next = week + 1;
			if ( next === 18 )
				next = 1;

			return next
		},
		prevWeek: function(week) {
			week = parseInt(week);
			var prev = week - 1;
			if ( prev === 0 )
				prev = 17;

			return prev
		}
	};

	return Utils;
});