Template.registerHelper('alreadyVoted', function(linkId) {
	return Links.findOne({_id: linkId, voters: {$in: [Meteor.userId()]}});
});

Template.registerHelper('getUsername', function(userId) {
	var user = Meteor.users.findOne({_id: userId});
	if(user === undefined) {
		return 'anonymous';
	}
	else {
		return user.username;
	}
});

Template.registerHelper('commentOwner', function(commentUser) {
	return Meteor.userId() == commentUser;
});