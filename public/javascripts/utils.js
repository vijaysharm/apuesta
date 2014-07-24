define(['module'], function(module){
	var Utils = {
		computeWeek: function() {
			return module.config().current;
		},
		getYear: function() {
			return module.config().year;
		},
		nextWeek: function(week) {
			week = parseInt(week);
			var next = week + 1;
			if ( next === (module.config().max + 1) )
				next = module.config().min;

			return next
		},
		prevWeek: function(week) {
			week = parseInt(week);
			var prev = week - 1;
			if ( prev === (module.config().min - 1) )
				prev = module.config().max;

			return prev
		}
	};

	return Utils;
});