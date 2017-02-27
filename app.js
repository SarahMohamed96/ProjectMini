var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");

});

 User = require(./user-model);

var testUser = new User({
    username: jmar777,
    password: Password;
});

testUser.save(function(err) {
    if (err) throw err;

User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;

    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); 
    });

    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch);
    });
});
