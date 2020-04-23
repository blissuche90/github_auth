module.exports = {
	development: {
		db: 'mongodb://blissuche:1uchenna@ds049864.mlab.com:49864/gihub-auth',
		app: {
			name: 'FireFlies GitHub Auth Sample'
		},
		facebook: {
			clientID: "{{PLACEHOLDER}}",
			clientSecret: "{{PLACEHOLDER}}",
			callbackURL: "{{PLACEHOLDER}}"
		},

		google: {
			clientID: "{{PLACEHOLDER}}",
			clientSecret: "{{PLACEHOLDER}}",
			callbackURL: "{{PLACEHOLDER}}"
		},
		github: {
			clientID: "68251764f47083a1de55",
			clientSecret: "5780eb8e1640c4c1d913ea6c5beb8ba8eae0cd1e",
			callbackURL: "https://fireflies-git-auth.herokuapp.com/auth/github/callback"
		}
	},
  	production: {
    	db: 'mongodb://blissuche:1uchenna@ds049864.mlab.com:49864/gihub-auth',//process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'FireFlies GitHub Auth Sample'
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: ""
		},
		google: {
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		},
		github: {
			clientID: '68251764f47083a1de55',
			clientSecret: '5780eb8e1640c4c1d913ea6c5beb8ba8eae0cd1e',
			callbackURL: 'https://fireflies-git-auth.herokuapp.com/auth/github/callback'
		}
 	}
}
