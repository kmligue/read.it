Comments = new Mongo.Collection('comments');

Meteor.methods({
	addComment: function(data) {
		check(data.commentBy, String);
		check(data.comment, String);
		check(data.linkId, String);

		data = _.extend(data, {createdAt: new Date()});

		Comments.insert(data, function(error) {
			if(error) {
				throw new Meteor.Error('insert-error', error.reason);
			}
			else {
				Links.update({_id: data.linkId}, {$inc: {comments: 1}});
			}
		});
	},
	destroyComment: function(data) {
		check(data.commentId, String);
		check(data.linkId, String);

		Comments.remove({_id: data.commentId}, function(error) {
			if(error) {
				throw new Meteor.Error('remove-error', error.reason);
			}
			else {
				Links.update({_id: data.linkId}, {$inc: {comments: -1}});
			}
		});
	}
});