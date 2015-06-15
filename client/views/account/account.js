Template.account.rendered = function() {
	Meteor.setTimeout(function() {
		$('#username').focus();
	}, 100);

	$('form').validate({
		rules: {
			username: 'required',
			cPassword: 'required'
		},
		messages: {
			username: 'Please enter username',
			cPassword: 'Please enter current password'
		},
		submitHandler: function() {
			var link = {
				userId: Meteor.userId(),
				username: $('#username').val(),
				password: $('#password').val()
			}

			Meteor.call('updateAccount', link, function(error, result) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else {
					Materialize.toast('Successfully updated!', 4000, 'green darken-2');
					$('#password').val('');
				}
			});
		},
		errorElement: 'em'
	});
};

Template.account.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	},
	'click .cancel-account': function(evt, tmpl) {
		evt.preventDefault();

		var user = {
			userId: Meteor.userId()
		}

		Meteor.call('deleteAccount', user, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
		});
	}
});

Template.account.helpers({
	userId: function() {
		return Meteor.userId();
	}
});