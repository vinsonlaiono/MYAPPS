// npm install express body-parser path sequelize mysql2

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port: ${port}`));
app.use(express.static(__dirname + '/client/dist/client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./server/models/mongoose');               // MongoDB
require('./server/models/sequalize');            // Sequelize
require('./server/config/users/routes')(app)    // Routes