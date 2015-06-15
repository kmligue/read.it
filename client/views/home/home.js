Template.home.onCreated(function() {
	this.subscribe('links');
});

Template.home.events({
	'click .link-upvote': function(evt, tmpl) {
		evt.preventDefault();

		if(Meteor.userId()) {
			var voter = {
				voter: Meteor.userId(),
				linkId: this._id
			}

			Meteor.call('upvote', voter, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
			});
		}
		else {
			Router.go('/signin');
		}
	},
	'click .link-downvote': function(evt, tmpl) {
		evt.preventDefault();

		if(Meteor.userId()) {
			var voter = {
				voter: Meteor.userId(),
				linkId: this._id
			}

			Meteor.call('downvote', voter, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
			});
		}
		else {
			Router.go('/signin');
		}
	}
});

Template.home.helpers({
	links: function() {
		return Links.find({}, {sort: {createdAt: -1}});
	}
});