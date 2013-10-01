define([
	'underscore',
	'backbone',
	'models/home'
], function(_,Backbone,HomeModel){
	var HomeCollection = Backbone.Collection.extend({
		model: HomeModel
	});

	return HomeCollection;
});