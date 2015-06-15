Links = new Mongo.Collection('links');

Meteor.methods({
	createLink: function(data) {
		check(data.title, String);
		check(data.url, String);
		check(data.submittedBy, String);

		data = _.extend(data, {upvote: 0, downvote: 0, comments: 0, voters: [], createdAt: new Date(), deleted: 0});

		return Links.insert(data);
	},
	upvote: function(data) {
		check(data.voter, String);
		check(data.linkId, String);

		return Links.update({_id: data.linkId}, {$inc: {upvote: 1}, $push: {voters: data.voter}});
	},
	downvote: function(data) {
		check(data.voter, String);
		check(data.linkId, String);

		return Links.update({_id: data.linkId}, {$inc: {downvote: 1}, $push: {voters: data.voter}});
	}
});