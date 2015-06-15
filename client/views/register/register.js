Template.register.events({
	'click .at-signin': function(evt, tmpl) {
		evt.preventDefault();

		Router.go('signin');
	}
});