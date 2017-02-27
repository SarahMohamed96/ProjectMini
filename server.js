var express    =    require('express');
var app        =    express();
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server     =    app.listen(3000,function(){
console.log("The app is running on port 3000!!!")
});

