Meteor.methods({
	updateAccount: function(data) {
		check(data.userId, String);
		check(data.username, String);

		if(data.password == '') {
			Meteor.users.update({_id: data.userId}, {$set: {username: data.username}});
		}
		else {
			Meteor.users.update({_id: data.userId}, {$set: {username: data.username}}, function(error) {
				if(error) {
					throw new Meteor.Error('update-error', error.reason);
				}
				else {
					Accounts.setPassword(data.userId, data.password, {logout: false});
				}
			});
		}
	},
	deleteAccount: function(data) {
		check(data.userId, String);

		return Meteor.users.remove({_id: data.userId});
	}
});