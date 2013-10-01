var metadata = {
	1 : {
		score: {
			away: 27,
			home: 49
		},
		spread : 9.5
	},
	2 : {
		score: {
			away: 23,
			home: 21
		},
		spread : -10.5
	},
	3 : {
		score: {
			away: 16,
			home: 09
		},
		spread : 3
	},
	4 : {
		score: {
			away: 17,
			home: 23
		},
		spread : 5.5
	},
	5 : {
		score: {
			away: 17,
			home: 18
		},
		spread : 10.5
	},
	6 : {
		score: {
			away: 28,
			home: 2
		},
		spread : 7
	},
	7 : {
		score: {
			away: 12,
			home: 7
		},
		spread : -4
	},
	8 : {
		score: {
			away: 21,
			home: 24
		},
		spread : -4
	},
	9 : {
		score: {
			away: 23,
			home: 10
		},
		spread : 3
	},
	10 : {
		score: {
			away: 24,
			home: 34
		},
		spread : -3.5
	},
	11 : {
		score: {
			away: 17,
			home: 21
		},
		spread : 1.5
	},
	12 : {
		score: {
			away: 28,
			home: 34
		},
		spread : 4.5
	},
	13 : {
		score: {
			away: 24,
			home: 27
		},
		spread : 4.5
	},
	14 : {
		score: {
			away: 31,
			home: 36
		},
		spread : 3.5
	},
	15 : {
		score: {
			away: 33,
			home: 27
		},
		spread : 3.5
	},
	16 : {
		score: {
			away: 31,
			home: 28
		},
		spread : -4.5
	}
};

exports.getMetadataByGame = function( id ) {
	return metadata[id];
}