var User = require('../app/models/user');
var Auth = require('./middlewares/authorization.js');
const https = require('https');
const axios = require('axios');
let sendUser={};
module.exports = function(app, passport){
	app.get("/", function(req, res){ 
		if(req.isAuthenticated()){
		  res.render("home", { user : req.user}); 
		}else{
			res.render("home", { user : null});
		}
		
	});

	app.get("/login", function(req, res){ 
		res.render("login");
	});

	app.post("/login" 
		,passport.authenticate('local',{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);

	app.get("/signup", function (req, res) {
		res.render("signup");
	});

	app.post("/signup", Auth.userExist, function (req, res, next) {
		User.signup(req.body.email, req.body.password, function(err, user){
			if(err) throw err;
			req.login(user, function(err){
				if(err) return next(err);
				return res.redirect("profile");
			});
		});
	});

	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
	app.get("/auth/facebook/callback", 
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			res.render("profile", {user : req.user});
		}
	);

	app.get('/auth/google',
	  passport.authenticate(
	  	'google',
		  {
		  	scope: [
		  	'https://www.googleapis.com/auth/userinfo.profile',
		  	'https://www.googleapis.com/auth/userinfo.email'
		  	]
		  })
	  );

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  });
	  //app.get('/auth/github',
	  //passport.authenticate('github'));
	  app.get('/auth/github',
  	  passport.authenticate('github'));

	app.get('/auth/github/callback', 
	  passport.authenticate('github', { failureRedirect: '/login' }),
	  function(req, res) {
		// Successful authentication, redirect home.

		var repo_result = [];		
		  axios.get('https://api.github.com/users/' + req.user.github.username + '/repos')
		  .then(response => {
			response.data.forEach(function(repo) {
			  var repoName = repo.name;
			  repo_result.push(repoName);
			});
			res.locals.repo_result = repo_result;
			res.render("profile", {user : req.user});
		  })
		  .catch(error => {
			console.log(error);
		  });

		//res.render("profile", {user : req.user});
	  });

	app.get("/profile", Auth.isAuthenticated , function(req, res){ 
		res.render("profile", { user : req.user});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.send( { message: 'Successfully logged out' } );
		res.redirect('/login');
	});
}