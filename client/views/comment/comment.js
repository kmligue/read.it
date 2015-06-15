Template.comment.onCreated(function() {
	this.subscribe('comments', Router.current().params.id);
});

Template.comment.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();

		var comment = {
			commentBy: Meteor.userId(),
			comment: $('#comment').val(),
			linkId: Router.current().params.id
		}

		Meteor.call('addComment', comment, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				$('#comment').val('');
			}
		});
	},
	'click .destroy': function(evt, tmpl) {
		evt.preventDefault();

		var comment = {
			commentId: this._id,
			linkId: this.linkId
		}

		Meteor.call('destroyComment', comment, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
		});
	}
});

Template.comment.helpers({
	comments: function() {
		return Comments.find();
	},
	commentsCount: function() {
		return Comments.find().fetch().length;
	}
});