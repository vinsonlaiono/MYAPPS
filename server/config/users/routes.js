const path = require('path');
const SeqUser = require('../../controllers/users')
const oauth = require('../../controllers/github-oauth')
const MonUser = require('../../controllers/mongoose-api/users')

// -----------------------------------
// GET ALL USERS
// -----------------------------------
module.exports = function(app){
    app.get('/signin/github/oauth', (req, res) => {
      oauth.authenticate(req, res);
    })
    
    // SEQUELIZE API CALLS
    app.get('/api/seq/users', (req, res) => {
        SeqUser.getAllUsers(req, res);
    })
    app.post('/api/seq/users', (req, res) => {
      SeqUser.createNewUser(req, res);
    })

    // MONGOOSE API CALLS
    app.get('/api/seq/users', (req, res) => {
        SeqUser.getAllUsers(req, res);
    })
    app.post('/api/mon/users', (req, res) => {
      MonUser.createNewUser(req, res);
    })
    
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/client/index.html"))
    });

    
};