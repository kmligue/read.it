Template.menu.events({
	'click .signout': function(evt, tmpl) {
		evt.preventDefault();

		Meteor.logout();
		Router.go('/');
	}
});