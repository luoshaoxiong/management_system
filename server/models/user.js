var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  'user_id': String,
  'user_name': String,
  'user_email': String,
  'user_pwd': String,
  'picture': String
});

module.exports = mongoose.model('User', userSchema, 'user');
