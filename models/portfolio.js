var mongoose = require('mongoose');

var PortfolioSchema = mongoose.Schema({
	fname: {
		type: String,
		index:true
	},
	lname: {
		type: String
	},
	picture:{
	type: String},
	description1: {type: String},
	description2: {type: String},
	description3: {type: String},
	description4: {type: String},
	description5: {type: String},
	
	
});

var Portfolio = module.exports = mongoose.model('PortfolioSchema', PortfolioSchema);

module.exports.createPortfolio = function(newportfolio, callback){
		newportfolio = new Portfolio;
	        newportfolio.save(callback);	}


