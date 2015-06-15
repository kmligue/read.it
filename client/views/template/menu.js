Template.menu.rendered = function() {
	$('.button-collapse').sideNav();
}

Template.menu.events({
	'click .signout': function(evt, tmpl) {
		evt.preventDefault();

		Meteor.logout();
		Router.go('/');
	}
});