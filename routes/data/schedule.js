var week = {};
week['1'] = [
	{ id: 1,  home: 'DEN', away: 'BAL' },
	{ id: 2,  home: 'BUF', away: 'NE' },
	{ id: 3,  home: 'PIT', away: 'TEN' },
	{ id: 4,  home: 'NWO', away: 'ATL' },
	{ id: 5,  home: 'NYJ', away: 'TB'  },
	{ id: 6,  home: 'JAC', away: 'KC'  },
	{ id: 7,  home: 'CAR', away: 'SEA' },
	{ id: 8,  home: 'CHI', away: 'CIN' },
	{ id: 9,  home: 'CLE', away: 'MIA' },
	{ id: 10, home: 'DET', away: 'MIN' },
	{ id: 11, home: 'IND', away: 'OAK' },
	{ id: 12, home: 'SF',  away: 'GB'  },
	{ id: 13, home: 'STL', away: 'ARZ' },
	{ id: 14, home: 'DAL', away: 'NYG' },
	{ id: 15, home: 'WAS', away: 'PHI' },
	{ id: 16, home: 'SD' , away: 'HOU' }
];

week['2'] = [
	{ id: 17, home: 'NYJ', away: 'NE'  },
	{ id: 18, home: 'STL', away: 'ATL' },
	{ id: 19, home: 'SD',  away: 'PHI' },
	{ id: 20, home: 'DAL', away: 'KC'  },
	{ id: 21, home: 'MIA', away: 'IND' },
	{ id: 22, home: 'TEN', away: 'HOU' },
	{ id: 23, home: 'WAS', away: 'GB'  },
	{ id: 24, home: 'CLE', away: 'BAL' },
	{ id: 25, home: 'CAR', away: 'BUF' },
	{ id: 26, home: 'MIN', away: 'CHI' },
	{ id: 27, home: 'NWO', away: 'TB'  },
	{ id: 28, home: 'DET', away: 'ARZ' },
	{ id: 29, home: 'JAC', away: 'OAK' },
	{ id: 30, home: 'DEN', away: 'NYG' },
	{ id: 31, home: 'SF',  away: 'SEA' },
	{ id: 32, home: 'PIT', away: 'CIN' }
];

week['3'] = [
	{ id: 33, home: 'KC',  away: 'PHI' },
	{ id: 34, home: 'HOU', away: 'BAL' },
	{ id: 35, home: 'NYG', away: 'CAR' },
	{ id: 36, home: 'DET', away: 'WAS' },
	{ id: 37, home: 'SD',  away: 'TEN' },
	{ id: 38, home: 'ARZ', away: 'NWO' },
	{ id: 39, home: 'TB',  away: 'NE'  },
	{ id: 40, home: 'GB',  away: 'CIN' },
	{ id: 41, home: 'STL', away: 'DAL' },
	{ id: 42, home: 'CLE', away: 'MIN' },
	{ id: 43, home: 'ATL', away: 'MIA' },
	{ id: 44, home: 'BUF', away: 'NYJ' },
	{ id: 45, home: 'IND', away: 'SF'  },
	{ id: 46, home: 'JAC', away: 'SEA' },
	{ id: 47, home: 'CHI', away: 'PIT' },
	{ id: 48, home: 'OAK', away: 'DEN' }
];

week['4'] = [
	{ id: 49, home: 'SF',  away: 'STL' },
	{ id: 50, home: 'BAL', away: 'BUF' },
	{ id: 51, home: 'ARZ', away: 'TB'  },
	{ id: 52, home: 'PIT', away: 'MIN' },
	{ id: 53, home: 'NYG', away: 'KC'  },
	{ id: 54, home: 'IND', away: 'JAC' },
	{ id: 55, home: 'SEA', away: 'HOU' },
	{ id: 56, home: 'CIN', away: 'CLE' },
	{ id: 57, home: 'CHI', away: 'DET' },
	{ id: 58, home: 'NYJ', away: 'TEN' },
	{ id: 59, home: 'WAS', away: 'OAK' },
	{ id: 60, home: 'PHI', away: 'DEN' },
	{ id: 61, home: 'DAL', away: 'SD'  },
	{ id: 62, home: 'NE', away: 'ATL' },
	{ id: 63, home: 'MIA', away: 'NWO' }
];

week['5'] = [
	{ id: 64, home: 'BUF', away: 'CLE' },
	{ id: 65, home: 'NE',  away: 'CIN' },
	{ id: 66, home: 'DET', away: 'GB'  },
	{ id: 67, home: 'SEA', away: 'IND' },
	{ id: 68, home: 'BAL', away: 'MIA' },
	{ id: 69, home: 'NWO', away: 'CHI' },
	{ id: 70, home: 'PHI', away: 'NYG' },
	{ id: 71, home: 'KC',  away: 'TEN' },
	{ id: 72, home: 'JAC', away: 'STL' },
	{ id: 73, home: 'CAR', away: 'ARZ' },
	{ id: 74, home: 'DEN', away: 'DAL' },
	{ id: 75, home: 'SD',  away: 'OAK' },
	{ id: 76, home: 'HOU', away: 'SF'  },
	{ id: 77, home: 'NYJ', away: 'ATL' }
];

exports.getGamesByWeek = function( id ) {
	return week[id]
}

// week[''] = [
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' },
// 	{ id: , home: '', away: '' }
// ];