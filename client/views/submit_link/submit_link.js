Template.submitLink.rendered = function() {
	Meteor.setTimeout(function() {
		$('#title').focus();
	}, 100);

	$('form').validate({
		rules: {
			title: 'required',
			url: 'required',
		},
		messages: {
			title: 'Please enter title',
			url: 'Please enter url'
		},
		submitHandler: function() {
			var link = {
				title: $('#title').val(),
				url: $('#url').val(),
				submittedBy: Meteor.userId()
			}
			Meteor.call('createLink', link, function(error, result) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Router.go('/link/' + result);
				}
			});
		},
		errorElement: 'em'
	});
};

Template.submitLink.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	}
});