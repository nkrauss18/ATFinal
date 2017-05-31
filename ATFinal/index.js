const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const server = require('http')
  .Server(app);
const io = require('socket.io')(server);
var dotenv = require('dotenv');

dotenv.load();

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
mongoose.connect('mongodb://localhost/atfinal');
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};



var port = process.env.PORT || 3000;
app.use(express.static('static'));
app.use(bodyParser.json());
const Card = require('./card.js');
const User = require('./user.js');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io
	.on('connection', socketioJwt.authorize({
		secret: process.env.AUTH0_CLIENT_SECRET,
		timeout: 15000 // 15 seconds to send the authentication message
	}))
	.on('authenticated', function(socket){
		console.log('connected & authenticated: ' + JSON.stringify(socket.decoded_token));
    socket.on('card', function(new_card) {
      Card.create({
        title: new_card[0],
        content: new_card[1],
      },function(err,card){
        if(err){
          throw(err);
        }
        console.log(card);
      });
      });
	});









server.listen(3000, function(){
  console.log('server is on');
});


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/:user-id', function(req, res){
  if (req.user.authenticated()){
    User.findById(id, function(err, user){
      if (err) throw err
      if (user==null){
        res.redirect('/')
      }
      //display Page
      res.render('user.html', {user: user})
    })
  }
})




app.post('/newCard',function(req,res){
	Card.create({
		title: req.body.title,
		positionX: req.body.positionX,
		positionY: req.body.positionY,
    content: req.body.content,
    checked: req.body.checked,
	},function(err,card){
		if(err){
			throw(err);
		}
		return card;
	});
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get("/json", function(req, res){
  Card.find({})
  .exec(function(err, cards){
    if (err) throw err;
    res.json(cards)
  })
});
app.post('/json', function(req, res){
  console.log(req.body);
  return res.json({msg: "got it!"});
});

app.post('/pos', function(req, res){
  console.log(req.body);
  return res.json({msg: "updated pos"});
});


// app.get('/', function(req, res){
  // res.sendFile('./index.html');
// });

app.use(express.static('.'));

app.listen(80);
