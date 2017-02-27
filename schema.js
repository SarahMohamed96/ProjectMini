var mongoose = require('mongoose');
var assert = require('assert');
var schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
      name: {type: String},
      email: {type: String},
      major: {type: String, max: 2}
    });

var User = mongoose.model(User, userSchema);
module.exports = User;
