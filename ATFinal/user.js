const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')

const User = mongoose.Schema({
  name: String,
  email: String,
  projects: Array,

});

User.plugin(plm);

module.exports= mongoose.model('User', User);
