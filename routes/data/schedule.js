var _ = require('underscore');

var week = {};
week['1'] = [
	{ id: 1,  home: 'DEN', away: 'BAL' },
	{ id: 2,  home: 'BUF', away: 'NE' },
	{ id: 3,  home: 'PIT', away: 'TEN' },
	{ id: 4,  home: 'NO', away: 'ATL' },
	{ id: 5,  home: 'NYJ', away: 'TB'  },
	{ id: 6,  home: 'JAC', away: 'KC'  },
	{ id: 7,  home: 'CAR', away: 'SEA' },
	{ id: 8,  home: 'CHI', away: 'CIN' },
	{ id: 9,  home: 'CLE', away: 'MIA' },
	{ id: 10, home: 'DET', away: 'MIN' },
	{ id: 11, home: 'IND', away: 'OAK' },
	{ id: 12, home: 'SF',  away: 'GB'  },
	{ id: 13, home: 'STL', away: 'ARI' },
	{ id: 14, home: 'DAL', away: 'NYG' },
	{ id: 15, home: 'WAS', away: 'PHI' },
	{ id: 16, home: 'SD' , away: 'HOU' }
];

week['2'] = [
	{ id: 17, away: 'NYJ', home: 'NE'  },
	{ id: 18, away: 'STL', home: 'ATL' },
	{ id: 19, away: 'SD',  home: 'PHI' },
	{ id: 20, away: 'DAL', home: 'KC'  },
	{ id: 21, away: 'MIA', home: 'IND' },
	{ id: 22, away: 'TEN', home: 'HOU' },
	{ id: 23, away: 'WAS', home: 'GB'  },
	{ id: 24, away: 'CLE', home: 'BAL' },
	{ id: 25, away: 'CAR', home: 'BUF' },
	{ id: 26, away: 'MIN', home: 'CHI' },
	{ id: 27, away: 'NO', home: 'TB'  },
	{ id: 28, away: 'DET', home: 'ARI' },
	{ id: 29, away: 'JAC', home: 'OAK' },
	{ id: 30, away: 'DEN', home: 'NYG' },
	{ id: 31, away: 'SF',  home: 'SEA' },
	{ id: 32, away: 'PIT', home: 'CIN' }
];

week['3'] = [
	{ id: 33, away: 'KC',  home: 'PHI' },
	{ id: 34, away: 'HOU', home: 'BAL' },
	{ id: 35, away: 'NYG', home: 'CAR' },
	{ id: 36, away: 'DET', home: 'WAS' },
	{ id: 37, away: 'SD',  home: 'TEN' },
	{ id: 38, away: 'ARI', home: 'NO' },
	{ id: 39, away: 'TB',  home: 'NE'  },
	{ id: 40, away: 'GB',  home: 'CIN' },
	{ id: 41, away: 'STL', home: 'DAL' },
	{ id: 42, away: 'CLE', home: 'MIN' },
	{ id: 43, away: 'ATL', home: 'MIA' },
	{ id: 44, away: 'BUF', home: 'NYJ' },
	{ id: 45, away: 'IND', home: 'SF'  },
	{ id: 46, away: 'JAC', home: 'SEA' },
	{ id: 47, away: 'CHI', home: 'PIT' },
	{ id: 48, away: 'OAK', home: 'DEN' }
];

week['4'] = [
	{ id: 49, away: 'SF',  home: 'STL' },
	{ id: 50, away: 'BAL', home: 'BUF' },
	{ id: 51, away: 'ARI', home: 'TB'  },
	{ id: 52, away: 'PIT', home: 'MIN' },
	{ id: 53, away: 'NYG', home: 'KC'  },
	{ id: 54, away: 'IND', home: 'JAC' },
	{ id: 55, away: 'SEA', home: 'HOU' },
	{ id: 56, away: 'CIN', home: 'CLE' },
	{ id: 57, away: 'CHI', home: 'DET' },
	{ id: 58, away: 'NYJ', home: 'TEN' },
	{ id: 59, away: 'WAS', home: 'OAK' },
	{ id: 60, away: 'PHI', home: 'DEN' },
	{ id: 61, away: 'DAL', home: 'SD'  },
	{ id: 62, away: 'NE', home: 'ATL' },
	{ id: 63, away: 'MIA', home: 'NO' }
];

week['5'] = [
	{ id: 64, away: 'BUF', home: 'CLE' },
	{ id: 65, away: 'NE',  home: 'CIN' },
	{ id: 66, away: 'DET', home: 'GB'  },
	{ id: 67, away: 'SEA', home: 'IND' },
	{ id: 68, away: 'BAL', home: 'MIA' },
	{ id: 69, away: 'NO', home: 'CHI' },
	{ id: 70, away: 'PHI', home: 'NYG' },
	{ id: 71, away: 'KC',  home: 'TEN' },
	{ id: 72, away: 'JAC', home: 'STL' },
	{ id: 73, away: 'CAR', home: 'ARI' },
	{ id: 74, away: 'DEN', home: 'DAL' },
	{ id: 75, away: 'SD',  home: 'OAK' },
	{ id: 76, away: 'HOU', home: 'SF'  },
	{ id: 77, away: 'NYJ', home: 'ATL' }
];

week['6'] = [
	{ id: 78, away: 'NYG', home: 'CHI' },
	{ id: 79, away: 'GB',  home: 'BAL' },
	{ id: 80, away: 'CIN', home: 'BUF'  },
	{ id: 81, away: 'DET', home: 'CLE' },
	{ id: 82, away: 'STL', home: 'HOU' },
	{ id: 83, away: 'CAR', home: 'MIN' },
	{ id: 84, away: 'OAK', home: 'KC' },
	{ id: 85, away: 'PIT',  home: 'NYJ' },
	{ id: 86, away: 'PHI', home: 'TB' },
	{ id: 87, away: 'JAC', home: 'DEN' },
	{ id: 88, away: 'TEN', home: 'SEA' },
	{ id: 89, away: 'NO',  home: 'NE' },
	{ id: 90, away: 'ARI', home: 'SF'  },
	{ id: 91, away: 'WAS', home: 'DAL' },
	{ id: 92, away: 'IND', home: 'SD' }
];

week['7'] = [
	{ id: 93, away: 'SEA', home: 'ARI' },
	{ id: 94, away: 'TB',  home: 'ATL' },
	{ id: 95, away: 'CHI', home: 'WAS'  },
	{ id: 96, away: 'DAL', home: 'PHI' },
	{ id: 97, away: 'NE', home: 'NYJ' },
	{ id: 98, away: 'BUF', home: 'MIA' },
	{ id: 99, away: 'STL', home: 'CAR' },
	{ id: 100, away: 'CIN',  home: 'DET' },
	{ id: 101, away: 'SD', home: 'JAC' },
	{ id: 102, away: 'HOU', home: 'KC' },
	{ id: 103, away: 'SF', home: 'TEN' },
	{ id: 104, away: 'CLE',  home: 'GB' },
	{ id: 105, away: 'BAL', home: 'PIT'  },
	{ id: 106, away: 'DEN', home: 'IND' },
	{ id: 107, away: 'MIN', home: 'NYG' }
];

week['8'] = [
	{ id: 108, away: 'CAR', home: 'TB' },
	{ id: 109, away: 'SF',  home: 'JAC' },
	{ id: 110, away: 'CLE', home: 'KC'  },
	{ id: 111, away: 'MIA', home: 'NE' },
	{ id: 112, away: 'BUF', home: 'NO' },
	{ id: 113, away: 'DAL', home: 'DET' },
	{ id: 114, away: 'NYG', home: 'PHI' },
	{ id: 115, away: 'PIT',  home: 'OAK' },
	{ id: 116, away: 'NYJ', home: 'CIN' },
	{ id: 117, away: 'ATL', home: 'ARI' },
	{ id: 118, away: 'WAS', home: 'DEN' },
	{ id: 119, away: 'GB',  home: 'MIN' },
	{ id: 120, away: 'SEA', home: 'STL' }
];

week['9'] = [
	{ id: 121, away: 'CIN', home: 'MIA' },
	{ id: 122, away: 'ATL',  home: 'CAR' },
	{ id: 123, away: 'MIN', home: 'DAL'  },
	{ id: 124, away: 'NO', home: 'NYJ' },
	{ id: 125, away: 'TEN', home: 'STL' },
	{ id: 126, away: 'KC', home: 'BUF' },
	{ id: 127, away: 'SD', home: 'WAS' },
	{ id: 128, away: 'PHI',  home: 'OAK' },
	{ id: 129, away: 'TB', home: 'SEA' },
	{ id: 130, away: 'BAL', home: 'CLE' },
	{ id: 131, away: 'PIT', home: 'NE' },
	{ id: 132, away: 'IND',  home: 'HOU' },
	{ id: 133, away: 'CHI', home: 'GB'  }
];

week['10'] = [
	{ id: 134, away: 'WAS', home: 'MIN' },
	{ id: 135, away: 'PHI',  home: 'GB' },
	{ id: 136, away: 'JAC', home: 'TEN'  },
	{ id: 137, away: 'BUF', home: 'PIT' },
	{ id: 138, away: 'OAK', home: 'NYG' },
	{ id: 139, away: 'STL', home: 'IND' },
	{ id: 140, away: 'SEA', home: 'ATL' },
	{ id: 141, away: 'CIN',  home: 'BAL' },
	{ id: 142, away: 'DET', home: 'CHI' },
	{ id: 143, away: 'CAR', home: 'SF' },
	{ id: 144, away: 'HOU', home: 'ARI' },
	{ id: 145, away: 'DEN',  home: 'SD' },
	{ id: 146, away: 'DAL', home: 'NO'  },
	{ id: 147, away: 'MIA', home: 'TB' }
];

week['11'] = [
	{ id: 148, away: 'IND', home: 'TEN' },
	{ id: 149, away: 'NYJ',  home: 'BUF' },
	{ id: 150, away: 'ATL', home: 'TB'  },
	{ id: 151, away: 'DET', home: 'PIT' },
	{ id: 152, away: 'WAS', home: 'PHI' },
	{ id: 153, away: 'SD', home: 'MIA' },
	{ id: 154, away: 'BAL', home: 'CHI' },
	{ id: 155, away: 'CLE',  home: 'CIN' },
	{ id: 156, away: 'OAK', home: 'HOU' },
	{ id: 157, away: 'ARI', home: 'JAC' },
	{ id: 158, away: 'KC', home: 'DEN' },
	{ id: 159, away: 'MIN',  home: 'SEA' },
	{ id: 160, away: 'SF', home: 'NO'  },
	{ id: 161, away: 'GB', home: 'NYG' },
	{ id: 162, away: 'NE', home: 'CAR' }
];

week['12'] = [
	{ id: 163, away: 'NO', home: 'ATL' },
	{ id: 164, away: 'TB',  home: 'DET' },
	{ id: 165, away: 'MIN', home: 'GB' },
	{ id: 166, away: 'JAC', home: 'HOU' },
	{ id: 167, away: 'SD', home: 'KC' },
	{ id: 168, away: 'CAR', home: 'MIA' },
	{ id: 169, away: 'PIT', home: 'CLE' },
	{ id: 170, away: 'CHI',  home: 'STL' },
	{ id: 171, away: 'NYJ', home: 'BAL' },
	{ id: 172, away: 'TEN', home: 'OAK' },
	{ id: 173, away: 'IND', home: 'ARI' },
	{ id: 174, away: 'DAL',  home: 'NYG' },
	{ id: 175, away: 'DEN', home: 'NE'  },
	{ id: 176, away: 'SF', home: 'WAS' }
];

week['13'] = [
	{ id: 177, away: 'GB', home: 'DET' },
	{ id: 178, away: 'OAK',  home: 'DAL' },
	{ id: 179, away: 'PIT', home: 'BAL'  },
	{ id: 180, away: 'DEN', home: 'KC' },
	{ id: 181, away: 'TEN', home: 'IND' },
	{ id: 182, away: 'JAC', home: 'CLE' },
	{ id: 183, away: 'TB', home: 'CAR' },
	{ id: 184, away: 'CHI',  home: 'MIN' },
	{ id: 185, away: 'ARI', home: 'PHI' },
	{ id: 186, away: 'MIA', home: 'NYJ' },
	{ id: 187, away: 'ATL', home: 'BUF' },
	{ id: 188, away: 'STL',  home: 'SF' },
	{ id: 189, away: 'NE', home: 'HOU'  },
	{ id: 190, away: 'CIN', home: 'SD' },
	{ id: 191, away: 'NYG', home: 'WAS' },
	{ id: 192, away: 'NO', home: 'SEA' }
];

week['14'] = [
	{ id: 193, away: 'HOU', home: 'JAC' },
	{ id: 194, away: 'IND',  home: 'CIN' },
	{ id: 195, away: 'CLE', home: 'NE'  },
	{ id: 196, away: 'OAK', home: 'NYJ' },
	{ id: 197, away: 'CAR', home: 'NO' },
	{ id: 198, away: 'DET', home: 'PHI' },
	{ id: 199, away: 'MIA', home: 'PIT' },
	{ id: 200, away: 'BUF',  home: 'TB' },
	{ id: 201, away: 'KC', home: 'WAS' },
	{ id: 202, away: 'MIN', home: 'BAL' },
	{ id: 203, away: 'TEN', home: 'DEN' },
	{ id: 204, away: 'STL',  home: 'ARI' },
	{ id: 205, away: 'NYG', home: 'SD'  },
	{ id: 206, away: 'SEA', home: 'SF' },
	{ id: 207, away: 'ATL', home: 'GB' },
	{ id: 208, away: 'DAL', home: 'CHI' }
];

week['15'] = [
	{ id: 209, away: 'SD', home: 'DEN' },
	{ id: 210, away: 'WAS',  home: 'ATL' },
	{ id: 211, away: 'ARI', home: 'TEN'  },
	{ id: 212, away: 'SF', home: 'TB' },
	{ id: 213, away: 'NO', home: 'STL' },
	{ id: 214, away: 'SEA', home: 'NYG' },
	{ id: 215, away: 'CHI', home: 'CLE' },
	{ id: 216, away: 'HOU',  home: 'IND' },
	{ id: 217, away: 'BUF', home: 'JAC' },
	{ id: 218, away: 'NE', home: 'MIA' },
	{ id: 219, away: 'PHI', home: 'MIN' },
	{ id: 220, away: 'KC',  home: 'OAK' },
	{ id: 221, away: 'NYJ', home: 'CAR'  },
	{ id: 222, away: 'GB', home: 'DAL' },
	{ id: 223, away: 'CIN', home: 'PIT' },
	{ id: 224, away: 'BAL', home: 'DET' }
];

week['16'] = [
	{ id: 225, away: 'MIA', home: 'BUF' },
	{ id: 226, away: 'NO',  home: 'CAR' },
	{ id: 227, away: 'DAL', home: 'WAS' },
	{ id: 228, away: 'TB', home: 'STL' },
	{ id: 229, away: 'CHI', home: 'PHI' },
	{ id: 230, away: 'CLE', home: 'NYJ' },
	{ id: 231, away: 'IND', home: 'KC' },
	{ id: 232, away: 'MIN',  home: 'CIN' },
	{ id: 233, away: 'DEN', home: 'HOU' },
	{ id: 234, away: 'TEN', home: 'JAC' },
	{ id: 235, away: 'ARI', home: 'SEA' },
	{ id: 236, away: 'NYG',  home: 'DET' },
	{ id: 237, away: 'OAK', home: 'SD' },
	{ id: 238, away: 'PIT', home: 'GB' },
	{ id: 239, away: 'NE', home: 'BAL' },
	{ id: 240, away: 'ATL', home: 'SF' }
];

week['17'] = [
	{ id: 241, away: 'CAR', home: 'ATL' },
	{ id: 242, away: 'GB',  home: 'CHI' },
	{ id: 243, away: 'HOU', home: 'TEN' },
	{ id: 244, away: 'CLE', home: 'PIT' },
	{ id: 245, away: 'WAS', home: 'NYG' },
	{ id: 246, away: 'BAL', home: 'CIN' },
	{ id: 247, away: 'PHI', home: 'DAL' },
	{ id: 248, away: 'JAC',  home: 'IND' },
	{ id: 249, away: 'NYJ', home: 'MIA' },
	{ id: 250, away: 'DET', home: 'MIN' },
	{ id: 251, away: 'BUF', home: 'NE' },
	{ id: 252, away: 'TB',  home: 'NO' },
	{ id: 253, away: 'DEN', home: 'OAK' },
	{ id: 254, away: 'SF', home: 'ARI' },
	{ id: 255, away: 'KC', home: 'SD' },
	{ id: 256, away: 'STL', home: 'SEA' }
];

/**
 * id should be a string
 */
exports.getGamesByWeek = function( id ) {
	return week[id];
};

var findGameInWeek = function( week, gameId ) {
	var game = _.find(week, function(game) { 
		return game.id === gameId; 
	});

	return game;
};

/**
 * gameId should be an int
 */
exports.getGameById = function( gameId ) {
	for ( var i in week ) {
		var w = week[i];
		var game = findGameInWeek( w, gameId );
		if ( game ) {
			var nextgame = findGameInWeek( w, gameId + 1 );
			var prevgame = findGameInWeek( w, gameId - 1 );

			if ( nextgame ) {
				game.next = gameId + 1;
			} else {
				game.next = w[0].id;
			}
			
			if ( prevgame ) {
				game.previous = gameId - 1;
			} else {
				game.previous = w[w.length-1].id;
			}

			game.week = i;			
			return game;
		}
	}
	return undefined;
};