Template.link.onCreated(function() {
	this.subscribe('link', Router.current().params.id);
});

Template.link.events({
	'click .link-upvote': function(evt, tmpl) {
		evt.preventDefault();

		if(Meteor.userId()) {
			var voter = {
				voter: Meteor.userId(),
				linkId: Router.current().params.id
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
				linkId: Router.current().params.id
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

Template.link.helpers({
	link: function() {
		return Links.findOne({_id: Router.current().params.id});
	},
	submittedBy: function(id) {
		return Meteor.users.findOne({_id: id}).username;
	}
});