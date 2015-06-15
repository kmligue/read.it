var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: 'username',
		type: 'text',
		displayName: 'username',
		required: true,
		minLength: 5	
	},
	pwd
]);

Router.plugin('ensureSignedIn', {
	except: ['home', 'signin', 'register', 'atSignIn', 'atSignUp', 'atForgotPassword']
});

AccountsTemplates.configure({
	onSubmitHook: function(error, state) {
		if(!error) {
			if(state == 'signIn') {
				Router.go('/');
			}
		}
	}
});