module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html', {title:"Home"})
     });


     app.get('/login',function(req,res){
        res.render('login.html', {title:"Login"});
    });


     app.get('/register',function(req,res){
        res.render('register.html', {title:"Register"});
    });

     app.get('/portfolioslogin',function(req,res){
        res.render('portfolioslogin.html', {title:"Portfolios"});
    });

     app.get('/success',function(req,res){
        res.render('success.html', {title:"Success"});
    });

     app.get('/portfoliosbefore',function(req,res){
        res.render('portfoliosbefore.html', {title:"PortfoliosBeforeS"});
    });
}


