var mongoose = require('mongoose');
  //, User = mongoose.model('User');
 var User= require("../models/user"); 

exports.index = function(req, res, next){
const user = req.user;

const user = await new User({
  firstName:  "Bliss",
	lastName:   "Uche",
  email: "email@email.com",
  
  salt: "123489999999"
}).save();

res.redirect('profile',{user})
}