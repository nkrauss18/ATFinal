
const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')

const Card = mongoose.Schema({
  title: String,
  positionX: Number,
  positionY: Number,
  content: String,
  checked: Boolean,
});

Card.plugin(plm);

module.exports= mongoose.model('Card', Card);
