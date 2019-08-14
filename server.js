// npm install express body-parser path sequelize mysql2

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      jwt = require('jsonwebtoken');
      
      port = process.env.PORT || 8000;
    
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET || 'durantula',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Working in ${process.env.NODE_ENV} Listening on port: ${port}`));
app.use(express.static(__dirname + '/client/dist/client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./server/models/mongoose');               // MongoDB
require('./server/models/sequalize');            // Sequelize
require('./server/config/users/routes')(app)    // Routes