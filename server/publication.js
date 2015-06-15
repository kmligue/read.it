Meteor.publishComposite('links', {
	find: function() {
		return Links.find({}, {sort: {createdAt: -1}});
	},
	children: [
		{
			find: function(link) {
				return Meteor.users.find({_id: link.submittedBy});
			}
		}
	]
});

Meteor.publishComposite('link', function(linkId) {
	return {
		find: function() {
			return Links.find({_id: linkId});
		},
		children: [
			{
				find: function(link) {
					return Meteor.users.find({_id: link.submittedBy});
				}
			}
		]
	}
});

Meteor.publish('comments', function(linkId) {
	return Comments.find({linkId: linkId}, {sort: {createdAt: 1}});
});