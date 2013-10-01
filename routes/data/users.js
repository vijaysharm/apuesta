var users = [
	{
		id: 1,
		name: 'Krishna',
		username: 'Krishna.Tiwari@statcan.gc.ca'
	}, 
	{
		id: 2,
		name: 'Pierre-Louis',
		username: 'Pierre-Louis.Venne@statcan.gc.ca'
	}, 
	{
		id: 3,
		name: 'Ralston',
		username: 'Ralston.McKenzie@statcan.gc.ca'
	},
	{
		id: 4,
		name: 'Sunil',
		username: 'Sunil.Bajaj@aandc-aadnc.gc.ca'
	}, 
	{
		id: 5,
		name: 'Vijay',
		username: 'vijay.sharm@gmail.com'
	}, 
];

exports.findUser = function( username ) {
	for ( var index in users ) {
		var user = users[index];
		if ( user.username === username ) {
			return user;
		}
	}

	return null;
};