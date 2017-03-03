var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Portfolio = require('../models/portfolio');
     

router.get('/newportfolio', function(req,res){
res.render('newportfolio.html', {title: "New Portfolio"})
});


router.get('/newportfolio2', function(req,res){
res.render('newportfolio2.html', {title: "New Portfolio"})
});

     router.get('/',function(req,res){
        res.render('index.html', {title:"Home"})
     });
	
	router.get('/portfolioslogin', function(req,res){
	res.render('portfolioslogin.html', {title: "Portfolios"});});

     router.get('/login',function(req,res){
        res.render('login.html', {title:"Login"});
    });

	router.get('/loginagain',function(req,res){
        res.render('loginagain.html', {title:"Login"});
    });

router.post('/login',
  passport.authenticate('local', {successRedirect:'portfolioslogin', failureRedirect:'loginagain',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });
	
	router.post('/loginagain',
  passport.authenticate('local', {successRedirect:'portfolioslogin', failureRedirect:'loginagain',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });


     router.get('/register',function(req,res){
        res.render('register.html', {title:"Register"});
    });

     router.get('/portfolioslogin',function(req,res){
        res.render('portfolioslogin.html', {title:"Portfolios"});
    });

     router.get('/success',function(req,res){
        res.render('success.html', {title:"Success"});
    });

     router.get('/portfoliosbefore',function(req,res){
        res.render('portfoliosbefore.html', {title:"Portfolios"});
    });

 router.get('/registeragain',function(req,res){
        res.render('registeragain.html', {title:"Register"});
    });

 router.get('/loginafter',function(req,res){
        res.render('loginafter.html', {title:"Login"});
    });

router.post('/loginafter',
  passport.authenticate('local', {successRedirect:'portfolioslogin', failureRedirect:'loginagain',failureFlash: true}), function(req, res) {
    res.redirect('/');
  });


router.post('/newportfolio', function(req,res){
var fname = req.body.fname;
var lname = req.body.lname;
var picture = req.body.picture;
var description1 = req.body.description1;
var description2 = req.body.description2;
var description3 = req.body.description3;
var description4 = req.body.description4;
var description5 = req.body.description5;

console.log(500);

req.checkBody('fname', 'First Name is required').notEmpty();
req.checkBody('lname', 'Last Name is required').notEmpty();
req.checkBody('description1', 'Description 1 is required').notEmpty();

var errors = req.validationErrors();

	if(errors){
		res.redirect('newportfolio2');
	} else {
		var newportfolio = new Portfolio({
			fname: fname,
			lname: lname,
			picture: picture,
			description1 : description1,
			description2 : description2,
			description3 : description3,
			description4 : description4,
			description5 : description5
		});

		Portfolio.createPortfolio(newportfolio, function(err, portfolio){
			if(err) throw err;
			console.log(portfolio);
		});

		req.flash('success_msg', 'You have created a portfolio');

		res.redirect('newportfolio3');
   }

});


router.post('/newportfolio2', function(req,res){
var fname = req.body.fname;
var lname = req.body.lname;
var picture = req.body.picture;
var description1 = req.body.description1;
var description2 = req.body.decription2;
var description3 = req.body.decription3;
var description4 = req.body.decription4;
var description5 = req.body.decription5;
req.checkBody('fname', 'First Name is required').notEmpty();
req.checkBody('lname', 'Last Name is required').notEmpty();
req.checkBody('description1', 'Description 1 is required').notEmpty();
var errors = req.validationErrors();
	if(errors){
		res.render('newportfolio2');
	} else {
		var newportfolio = new Portfolio({
			fname: fname,
			lname: lname,
			picture: picture,
			description1 : description1,
			description2 : description2,
			description3 : description3,
			description4 : description4,
			description5 : description5
		});

		Portfolio.createPortfolio(newportfolio, function(err, portfolio){
			if(err) throw err;
			console.log(portfolio);
		});

		req.flash('success_msg', 'You have created a portfolio');

		res.redirect('newportfolio3');
   }

});





router.post('/registeragain',function(req,res){
        var username = req.body.username;
	var password = req.body.password;
        console.log(username); 

	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('registeragain');
	} else {
		var newUser = new User({
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('loginafter');
   } });

router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
        console.log(username); 

	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.redirect('registeragain');
	} else {
		var newUser = new User({
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('loginafter');
	}

});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = router;
